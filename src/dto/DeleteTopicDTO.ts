import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteTopicDTO {
    @IsNumber()
    @IsNotEmpty()
    topicId: number;
}