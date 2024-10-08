import { IsNotEmpty, IsNumber } from "class-validator";

export class GetStudentsResultsDTO {
    @IsNumber()
    @IsNotEmpty()
    testId: number;
}