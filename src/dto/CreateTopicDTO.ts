import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTopicDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  organizationId: number;
}
