import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTopicDTO } from "../dto/CreateTopicDTO";
import { Topic } from "../entities/Topic";
import { QuestionsDTO } from "../dto/QuestionsDTO";
import { QuestionService } from "./QuestionService";
import { OrganizationService } from "./OrganizationService";

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic) private topicRepository: Repository<Topic>,
        private readonly questionService: QuestionService,
        private readonly organizationService: OrganizationService
    ) {
    }

    async create(createTopicDTO: CreateTopicDTO): Promise<Topic> {
        await this.organizationService.receiveById(createTopicDTO.organizationId);

        const topic = await this.topicRepository.findOneBy({
            name: createTopicDTO.name,
            organizationId: createTopicDTO.organizationId
        });

        if (topic !== null) {
            throw new ConflictException("Тема с таким названием уже существует.");
        }

        return await this.topicRepository.save({
            organizationId: createTopicDTO.organizationId,
            name: createTopicDTO.name,
            questionIds: []
        });
    }

    async receive(topicId: number): Promise<Topic> {
        const topic = await this.topicRepository.findOneBy({ id: topicId });

        if (topic === null) {
            throw new NotFoundException("Темы с таким id не существует.");
        }

        return topic;
    }

    async addQuestions(addQuestionsDTO: QuestionsDTO): Promise<Topic> {
        const topic = await this.receive(addQuestionsDTO.topicId);

        let questionIds = [];

        for (const q of addQuestionsDTO.questions) {
            const question = await this.questionService.create(q, addQuestionsDTO.topicId);
            questionIds.push(question.id);
        }

        topic.questionIds = topic.questionIds.concat(questionIds);
        await this.topicRepository.save(topic);

        return topic;
    }

    async addQuestionId(questionId: number, topicId: number): Promise<void> {
        const topic = await this.receive(topicId);
        topic.questionIds.push(questionId);
        await this.topicRepository.save(topic);
    }
}
