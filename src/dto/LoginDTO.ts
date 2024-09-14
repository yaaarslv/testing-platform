import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}