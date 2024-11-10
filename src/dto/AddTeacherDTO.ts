import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddTeacherDTO {
  @IsNumber()
  @IsNotEmpty()
  organizationId: number;

  @IsNumber()
  @IsNotEmpty()
  teacherId: number;
}
