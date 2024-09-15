import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTeacherDTO {
    @IsNotEmpty()
    @IsNumber()
    organizationId: number;

    @IsNotEmpty()
    @IsString()
    name: string;
}