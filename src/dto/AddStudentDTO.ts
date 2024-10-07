import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class AddStudentDTO {
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @IsNumber()
    @IsNotEmpty()
    studentId: number;
}

export class AddGroupsDTO {
    @IsArray()
    @IsNotEmpty()
    groups: string[];

    @IsNumber()
    @IsNotEmpty()
    teacherId: number;
}

export class ReceiveTeacherGroups {
    @IsNumber()
    @IsNotEmpty()
    teacherId: number;
}