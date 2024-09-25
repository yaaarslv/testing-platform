import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Test } from "../entities/Test";
import { CreateTestDTO } from "../dto/CreateTestDTO";
import { ReceiveTestDTO } from "../dto/ReceiveTestDTO";
import { AuthService } from "./AuthService";
import { ERole } from "../models/ERole";
import { TeacherService } from "./TeacherService";
import { StudentService } from "./StudentService";
import { GenerateTestDTO } from "../dto/GenerateTestDTO";
import { QuestionService } from "./QuestionService";
import { CheckTestDTO, ReturnGeneratedTest } from "../dto/CheckTestDTO";
import { AnswerService } from "./AnswerService";
import { Answer } from "../entities/Answer";
import { TestAttemptService } from "./TestAttemptService";
import { AttemptDetailService } from "./AttemptDetailService";

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test) private testRepository: Repository<Test>,
        private readonly authService: AuthService,
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService,
        private readonly questionService: QuestionService,
        private readonly answerService: AnswerService,
        private readonly testAttemptService: TestAttemptService,
    ) {
    }

    async create(createTestDTO: CreateTestDTO): Promise<Test> {
        return await this.testRepository.save({
            testName: createTestDTO.testName,
            topic: createTestDTO.topicId,
            teacher: createTestDTO.teacherId,
            questionCount: createTestDTO.questionCount,
            attempts: createTestDTO.attempts
        });
    }

    async receiveAll(receiveTestDTO: ReceiveTestDTO): Promise<Test[]> {
        const login = receiveTestDTO.login;
        const user = await this.authService.receiveUser(login);

        if (user.role === ERole.Teacher) {
            const teacher = await this.teacherService.receiveByUserId(user.id);
            return await this.receiveByTeacherId(teacher.id);
        } else if (user.role === ERole.Student) {
            const student = await this.studentService.receiveByUserId(user.id);
            return await this.testRepository.findBy({ group: student.group });
        }
    }

    async receiveByTestId(testId: number): Promise<Test> {
        const test = await this.testRepository.findOneBy({id: testId});

        if (test === null) {
            throw new NotFoundException("Теста с таким id не существует.");
        }

        return test;
    }

    async receiveByTeacherId(teacherId: number): Promise<Test[]> {
        return await this.testRepository.find({ where: { teacher: teacherId }, relations: ["teacher", "topic"] });
    }

    async generateTest(generateTestDTO: GenerateTestDTO): Promise<ReturnGeneratedTest> {
        const testId = generateTestDTO.testId;
        const test = await this.receiveByTestId(testId);

        const login = generateTestDTO.login;
        const user = await this.authService.receiveUser(login);
        const student = await this.studentService.receiveByUserId(user.id);

        //todo протестировать
        const usedAttempts = await this.testAttemptService.receiveUsedAttemptsByStudentIdAndTestId(student.id, testId);
        if (usedAttempts >= test.attempts) {
            throw new ForbiddenException("Использованы все попытки для данного теста");
        }

        const topicQuestionsCount = await this.questionService.getTopicQuestionsCount(test.topic);

        if (topicQuestionsCount < test.questionCount) {
            throw new ConflictException("В банке вопросов этой темы недостаточно вопросов для создания теста с выбранным количеством вопросов");
        }

        const randomQuestions = await this.questionService.getRandomQuestions(test.questionCount);
        return new ReturnGeneratedTest(testId, randomQuestions);
    }

    async checkTest(checkTestDTO: CheckTestDTO): Promise<boolean> {
        const login = checkTestDTO.login;
        const user = await this.authService.receiveUser(login);
        const student = await this.studentService.receiveByUserId(user.id);

        const test = await this.receiveByTestId(checkTestDTO.testId);
        let correctAnswers = 0;
        const qCount = test.questionCount;
        const allAnswers = checkTestDTO.answers;

        for (const a of allAnswers) {
            const question = await this.questionService.receive(a.id);
            const qAnswers: Answer[] = [];
            for (const qa of question.answerIds) {
                qAnswers.push(await this.answerService.receive(qa));
            }

            const qCorrectAnswersCount = qAnswers.filter((a) => a.isCorrect).length;
            const aSelectedCorrectAnswersCount = a.answerTexts.length;

            if (qCorrectAnswersCount === aSelectedCorrectAnswersCount) {
                const isAllCorrect = a.answerTexts.every(answerText =>
                    qAnswers.filter(ans => ans.isCorrect).some(correctAnswer => correctAnswer.answerText === answerText)
                );

                if (isAllCorrect) {
                    correctAnswers += 1;
                }
            }
        }

        await this.testAttemptService.create(student.id, test.topic, correctAnswers, test.id);
        // await this.attemptDetailService.create(testAttempt.id, ) // под обсуждением

        return true;
    }
}
