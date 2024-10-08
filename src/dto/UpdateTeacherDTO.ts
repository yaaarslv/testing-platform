import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTeacherDTO {
    @IsNumber()
    @IsOptional()
    userID: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}