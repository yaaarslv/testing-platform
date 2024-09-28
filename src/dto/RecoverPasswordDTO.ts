import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RecoverPasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class UpdatePasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class CheckRecoverLinkDTOs {
    @IsString()
    @IsNotEmpty()
    link: string;
}