import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTopicDTO {
    @IsNumber()
    @IsOptional()
    organizationId: number;

    @IsString()
    @IsOptional()
    name: string;
}