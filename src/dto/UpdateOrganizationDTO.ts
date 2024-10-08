import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateOrganizationDTO {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsPhoneNumber()
    @IsOptional()
    phone: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    responsiblePerson: string;
}