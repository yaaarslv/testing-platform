import { IsNotEmpty, IsNumber } from "class-validator";

export class ReceiveByStudentIdAndTestIdWithStudentDTO {
    @IsNumber()
    @IsNotEmpty()
    studentId: number;

    @IsNumber()
    @IsNotEmpty()
    testId: number;
}