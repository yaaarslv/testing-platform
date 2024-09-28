import { IsNotEmpty, IsNumber } from "class-validator";

export class AddTopicDTO {
    @IsNumber()
    @IsNotEmpty()
    organizationId: number;

    @IsNumber()
    @IsNotEmpty()
    topicId: number;
}