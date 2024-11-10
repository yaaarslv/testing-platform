import { IsNotEmpty, IsNumber } from "class-validator";

export class RemoveStudentIdDTO {
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @IsNumber()
    @IsNotEmpty()
    studentId: number
}