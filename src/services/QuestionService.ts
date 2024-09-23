import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnswerDTO, QuestionDTO } from "../dto/QuestionsDTO";
import { Question } from "../entities/Question";
import { AnswerService } from "./AnswerService";
import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TopicService } from "./TopicService";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        private readonly answerService: AnswerService,
        @Inject(forwardRef(() => TopicService))  private readonly topicService: TopicService
    ) {
    }

    async create(questionDTO: QuestionDTO, topicId: number, addToParent: boolean = false): Promise<Question> {
        let answerIds = [];
        for (const a of questionDTO.answers) {
            const answer = await this.answerService.create(a);
            answerIds.push(answer.id);
        }

        const question = await this.questionRepository.save({
            topicId: topicId,
            questionText: questionDTO.questionText,
            answerIds: answerIds
        });

        if (addToParent) {
            await this.topicService.addQuestionId(question.id, topicId);
        }

        return question;
    }

    async receive(questionId: number): Promise<Question> {
        const question = await this.questionRepository.findOneBy({ id: questionId });

        if (question === null) {
            throw new NotFoundException("Вопроса с таким id не существует.");
        }

        return question;
    }

    async addAnswers(answerDTOS: AnswerDTO[], questionId: number): Promise<Question> {
        const question = await this.receive(questionId);

        let answerIds = [];
        for (const a of answerDTOS) {
            const answer = await this.answerService.create(a);
            answerIds.push(answer.id);
        }

        question.answerIds = question.answerIds.concat(answerIds);

        await this.questionRepository.save(question);

        return question;
    }

    async addAnswerId(answerId: number, questionId: number): Promise<void> {
        const question = await this.receive(questionId);
        question.answerIds.push(answerId);
        await this.questionRepository.save(question);
    }
}
