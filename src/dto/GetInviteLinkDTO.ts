import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetInviteLinkDTO {
  @IsNumber()
  @IsNotEmpty()
  role: number;

  @IsNumber()
  @IsNotEmpty()
  actorId: number;

  @IsString()
  @IsNotEmpty()
  orgName: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
