import { IsNotEmpty, IsNumber } from "class-validator";

export class RemoveTeacherIdDTO {
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @IsNumber()
    @IsNotEmpty()
    teacherId: number
}