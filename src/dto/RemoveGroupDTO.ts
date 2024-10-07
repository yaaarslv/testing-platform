import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RemoveGroupDTO {
    @IsNumber()
    @IsNotEmpty()
    teacherId: number;

    @IsString()
    @IsNotEmpty()
    group: string;
}