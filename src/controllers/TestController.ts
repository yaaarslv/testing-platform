import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AnswerDTO, QuestionDTO } from "../dto/QuestionsDTO";
import { QuestionService } from "../services/QuestionService";
import { Question } from "../entities/Question";
import { CreateTestDTO } from "../dto/CreateTestDTO";
import { TestService } from "../services/TestService";
import { Test } from "@nestjs/testing";

@Controller("test")
export class TestController {
    constructor(private readonly testService: TestService) {
    }

    @Post("create")
    async create(@Body() createTestDTO: CreateTestDTO): Promise<Test> {
        return await this.testService.create(createTestDTO);
    }

    // @Post("add_answers/:question_id")
    // async addQuestions(@Body() answerDTOS: AnswerDTO[], @Param("question_id") questionId: number): Promise<Question> {
    //     return await this.questionService.addAnswers(answerDTOS,questionId);
    // }
    //
    // @Get("receive/:question_id")
    // async receiveTopic(@Param("question_id") questionId: number): Promise<Question> {
    //     return await this.questionService.receive(questionId);
    // }
}
