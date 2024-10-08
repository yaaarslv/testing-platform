import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteStudentDTO {
    @IsNumber()
    @IsNotEmpty()
    studentId: number;
}