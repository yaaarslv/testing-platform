import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AnswerDTO, QuestionDTO, ReturnQuestionDTO } from "../dto/QuestionsDTO";
import { QuestionService } from "../services/QuestionService";
import { Question } from "../entities/Question";
import { UpdateQuestionDTO } from "../dto/UpdateQuestionDTO";

@Controller("question")
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {
    }

    @Post("create/:topic_id")
    async create(@Body() questionDTO: QuestionDTO, @Param("topic_id") topicId: number): Promise<Question> {
        return await this.questionService.create(questionDTO, topicId, true);
    }

    @Put("update/:id")
    async update(@Param("id") id: number, @Body() updateTeacherDTO: UpdateQuestionDTO): Promise<Question> {
        return await this.questionService.update(id, updateTeacherDTO);
    }

    @Post("add_answers/:question_id")
    async addAnswers(@Body() answerDTOS: AnswerDTO[], @Param("question_id") questionId: number): Promise<Question> {
        return await this.questionService.addAnswers(answerDTOS, questionId);
    }

    @Get("receive/:question_id")
    async receiveQuestion(@Param("question_id") questionId: number): Promise<ReturnQuestionDTO> {
        return await this.questionService.receiveWithAnswerText(questionId);
    }
}
