import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnswerDTO } from "../dto/QuestionsDTO";
import { Answer } from "../entities/Answer";
import { QuestionService } from "./QuestionService";
import { forwardRef, Inject, NotFoundException } from "@nestjs/common";
import { ValidationService } from "./ValidationService";
import { UpdateAnswerDTO } from "../dto/UpdateAnswerDTO";

export class AnswerService {
    constructor(
        @InjectRepository(Answer) private answerRepository: Repository<Answer>,
        @Inject(forwardRef(() => QuestionService)) private readonly questionService: QuestionService
    ) {
    }

    async create(answerDTO: AnswerDTO, questionId: number = 0, addToParent: boolean = false): Promise<Answer> {
        const answer = await this.answerRepository.save({
            answerText: answerDTO.answerText,
            isCorrect: answerDTO.isCorrect
        });

        if (addToParent) {
            await this.questionService.addAnswerId(answer.id, questionId);
        }

        return answer;
    }

    async receive(answerId: number): Promise<Answer> {
        const answer = await this.answerRepository.findOneBy({ id: answerId });

        if (answer === null) {
            throw new NotFoundException("Ответа с таким id не существует.");
        }

        return answer;
    }

    async delete(answerId: number) {
        const answer = await this.receive(answerId);
        if (answer != null) {
            await this.answerRepository.delete(answer.id);
        }

        return true;
    }

    async update(answerId: number, updateAnswerDTO: UpdateAnswerDTO): Promise<Answer> {
        const answer = await this.receive(answerId);

        if (!ValidationService.isNothing(updateAnswerDTO.answerText)) {
            answer.answerText = updateAnswerDTO.answerText;
        }

        if (!ValidationService.isNothing(updateAnswerDTO.isCorrect)) {
            answer.isCorrect = updateAnswerDTO.isCorrect;
        }

        await this.answerRepository.save(answer);

        return answer;
    }
}
