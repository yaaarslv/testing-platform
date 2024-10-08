import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateAnswerDTO {
    @IsString()
    @IsOptional()
    answerText: string;

    @IsBoolean()
    @IsOptional()
    isCorrect: boolean;
}