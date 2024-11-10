import { IsOptional, IsString } from "class-validator";

export class UpdateQuestionDTO {
    @IsString()
    @IsOptional()
    questionText: string;
}