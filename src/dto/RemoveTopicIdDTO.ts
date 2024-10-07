import { IsNotEmpty, IsNumber } from "class-validator";

export class RemoveTopicIdDTO {
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @IsNumber()
    @IsNotEmpty()
    topicId: number
}