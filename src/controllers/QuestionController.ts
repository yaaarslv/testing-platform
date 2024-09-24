import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AnswerDTO, QuestionDTO, ReturnQuestionDTO } from "../dto/QuestionsDTO";
import { QuestionService } from "../services/QuestionService";
import { Question } from "../entities/Question";

@Controller("question")
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {
    }

    @Post("create/:topic_id")
    async create(@Body() questionDTO: QuestionDTO, @Param("topic_id") topicId: number): Promise<Question> {
        return await this.questionService.create(questionDTO, topicId, true);
    }

    @Post("add_answers/:question_id")
    async addAnswers(@Body() answerDTOS: AnswerDTO[], @Param("question_id") questionId: number): Promise<Question> {
        return await this.questionService.addAnswers(answerDTOS, questionId);
    }

    // todo подумать, нахуя я вообще это написал (в какой ситуации понадобится получать вопрос по id)
    @Get("receive/:question_id")
    async receiveQuestion(@Param("question_id") questionId: number): Promise<ReturnQuestionDTO> {
        return await this.questionService.receiveWithAnswerText(questionId);
    }
}
