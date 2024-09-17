import { Body, Controller, Post } from '@nestjs/common';
import { CreateTopicDTO } from '../dto/CreateTopicDTO';
import { TopicService } from '../services/TopicService';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post('create')
  async create(@Body() createTopicDTO: CreateTopicDTO): Promise<number> {
    return await this.topicService.create(createTopicDTO);
  }

  @Post('add_questions')
  async addQuestions(@Body() createTopicDTO: CreateTopicDTO): Promise<boolean> {
    return await this.topicService.addQuestions(createTopicDTO);
  }
}
