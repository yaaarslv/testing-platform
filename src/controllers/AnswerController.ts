import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AnswerDTO } from "../dto/QuestionsDTO";
import { AnswerService } from "../services/AnswerService";
import { Answer } from "../entities/Answer";
import { UpdateAnswerDTO } from "../dto/UpdateAnswerDTO";

@Controller("answer")
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {
    }

    @Post("create/:question_id")
    async create(@Body() answerDTO: AnswerDTO, @Param("question_id") questionId: number): Promise<Answer> {
        return await this.answerService.create(answerDTO, questionId, true);
    }

    @Put("update/:id")
    async update(@Param("id") id: number, @Body() updateAnswerDTO: UpdateAnswerDTO): Promise<Answer> {
        return await this.answerService.update(id, updateAnswerDTO);
    }

    @Get("receive/:answer_id")
    async receiveTopic(@Param("answer_id") answerId: number): Promise<Answer> {
        return await this.answerService.receive(answerId);
    }
}
