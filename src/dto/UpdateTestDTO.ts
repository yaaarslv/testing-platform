import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTestDTO {
    @IsString()
    @IsOptional()
    testName: string;

    @IsNumber()
    @IsOptional()
    topic: number;

    @IsNumber()
    @IsOptional()
    questionCount: number;

    @IsNumber()
    @IsOptional()
    attempts: number;

    @IsString()
    @IsOptional()
    group: string;
}