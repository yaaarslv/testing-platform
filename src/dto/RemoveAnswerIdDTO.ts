import { IsNotEmpty, IsNumber } from "class-validator";

export class RemoveAnswerIdDTO {
    @IsNumber()
    @IsNotEmpty()
    questionId: number;

    @IsNumber()
    @IsNotEmpty()
    answerId: number
}