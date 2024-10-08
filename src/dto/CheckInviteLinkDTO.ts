import { IsNotEmpty, IsString } from "class-validator";

export class CheckInviteLinkDTO {
    @IsString()
    @IsNotEmpty()
    link: string;
}