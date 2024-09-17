import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddStudentDTO {
  @IsNumber()
  @IsNotEmpty()
  organizationId: number;

  @IsNumber()
  @IsNotEmpty()
  studentId: number;
}
