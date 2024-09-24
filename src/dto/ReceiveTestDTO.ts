import { IsNotEmpty, IsString } from "class-validator";

export class ReceiveTestDTO {
    @IsString()
    @IsNotEmpty()
    login: string;
}
