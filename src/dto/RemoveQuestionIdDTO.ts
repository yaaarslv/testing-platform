import { IsNotEmpty, IsNumber } from "class-validator";

export class RemoveQuestionIdDTO {
    @IsNumber()
    @IsNotEmpty()
    questionId: number;

    @IsNumber()
    @IsNotEmpty()
    topicId: number
}