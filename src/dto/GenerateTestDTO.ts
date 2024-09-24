import { IsNotEmpty, IsNumber } from "class-validator";

export class GenerateTestDTO {
    @IsNumber()
    @IsNotEmpty()
    testId: number;
}