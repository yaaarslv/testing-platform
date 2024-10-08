import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDTO {
    @IsEmail()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    role: number;

    @IsNumber()
    @IsNotEmpty()
    actorId: number;
}
