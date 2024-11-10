import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteTeacherDTO {
    @IsNumber()
    @IsNotEmpty()
    teacherId: number;
}