import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTopicDTO } from "../dto/CreateTopicDTO";
import { TopicService } from "../services/TopicService";
import { QuestionsDTO } from "../dto/QuestionsDTO";
import { Topic } from "../entities/Topic";
import { UpdateTopicDTO } from "../dto/UpdateTopicDTO";
import { DeleteTopicDTO } from "../dto/DeleteTopicDTO";

@Controller("topic")
export class TopicController {
    constructor(private readonly topicService: TopicService) {
    }

    @Post("create")
    async create(@Body() createTopicDTO: CreateTopicDTO): Promise<Topic> {
        return await this.topicService.create(createTopicDTO);
    }

    @Put("update/:id")
    async update(@Param("id") id: number, @Body() updateTopicDTO: UpdateTopicDTO): Promise<Topic> {
        return await this.topicService.update(id, updateTopicDTO);
    }

    @Delete("delete")
    async delete(@Body() deleteTopicDTO: DeleteTopicDTO): Promise<boolean> {
        return await this.topicService.delete(deleteTopicDTO);
    }


    @Post("add_questions")
    async addQuestions(@Body() addQuestionsDTO: QuestionsDTO): Promise<Topic> {
        return await this.topicService.addQuestions(addQuestionsDTO);
    }

    @Get("receive/:topic_id")
    async receiveTopic(@Param("topic_id") topicId: number) {
        return await this.topicService.receive(topicId);
    }
}
