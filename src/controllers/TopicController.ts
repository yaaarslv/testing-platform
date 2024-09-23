import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTopicDTO } from "../dto/CreateTopicDTO";
import { TopicService } from "../services/TopicService";
import { QuestionsDTO } from "../dto/QuestionsDTO";
import { Topic } from "../entities/Topic";

@Controller("topic")
export class TopicController {
    constructor(private readonly topicService: TopicService) {
    }

    @Post("create")
    async create(@Body() createTopicDTO: CreateTopicDTO): Promise<Topic> {
        return await this.topicService.create(createTopicDTO);
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
