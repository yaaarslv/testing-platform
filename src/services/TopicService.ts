import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { CreateTopicDTO } from "../dto/CreateTopicDTO";
import { Topic } from "../entities/Topic";

export class TopicService {
    constructor(
        @InjectRepository(Topic) private topicRepository: Repository<Topic>
    ) {
    }

    async create(createTopicDTO: CreateTopicDTO): Promise<number> {
        const topic = await this.topicRepository.findOneBy({
            name: createTopicDTO.name
        });

        if (topic !== null) {
            throw new ConflictException("Тема с таким названием уже существует.");
        }

        const newTopic = await this.topicRepository.save({
            organizationId: createTopicDTO.organizationId,
            name: createTopicDTO.name,
            questions: []
        });
        return newTopic.id;
    }

    async receive(topicId: number): Promise<Topic> {
        const topic = await this.topicRepository.findOneBy({ id: topicId });

        if (topic === null) {
            throw new NotFoundException("Темы с таким id не существует.");
        }

        return topic;
    }

    async addQuestions(createTopicDTO: CreateTopicDTO) {
        // todo передавать поля вопроса, каждый сохранить в бд и потом уже добавить в топик и обновить его
        return true;
    }
}
