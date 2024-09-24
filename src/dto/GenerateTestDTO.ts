import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GenerateTestDTO {
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsNumber()
    @IsNotEmpty()
    testId: number;
}