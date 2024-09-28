import { IsEmail, IsNotEmpty } from "class-validator";

export class RecoverPasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}