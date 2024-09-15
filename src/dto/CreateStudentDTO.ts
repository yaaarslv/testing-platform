import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentDTO {
    @IsNotEmpty()
    @IsNumber()
    organizationId: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    group: string;
}