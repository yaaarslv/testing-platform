import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTopicDTO } from "../dto/CreateTopicDTO";
import { Topic } from "../entities/Topic";
import { QuestionsDTO } from "../dto/QuestionsDTO";
import { QuestionService } from "./QuestionService";
import { OrganizationService } from "./OrganizationService";
import { ValidationService } from "./ValidationService";
import { UpdateTopicDTO } from "../dto/UpdateTopicDTO";
import { DeleteTopicDTO } from "../dto/DeleteTopicDTO";
import { RemoveQuestionIdDTO } from "../dto/RemoveQuestionIdDTO";

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic) private topicRepository: Repository<Topic>,
        private readonly questionService: QuestionService,
        private readonly organizationService: OrganizationService
    ) {
    }

    async create(createTopicDTO: CreateTopicDTO): Promise<Topic> {
        const organization = await this.organizationService.receiveById(createTopicDTO.organizationId);

        const topic = await this.topicRepository.findOneBy({
            name: createTopicDTO.name,
            organizationId: createTopicDTO.organizationId
        });

        if (topic !== null) {
            throw new ConflictException("Тема с таким названием уже существует.");
        }

        const newTopic = await this.topicRepository.save({
            organizationId: createTopicDTO.organizationId,
            name: createTopicDTO.name
        });

        await this.organizationService.addTopic(organization, newTopic);

        return newTopic;
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

    async removeQuestionId(removeQuestionIdDTO: RemoveQuestionIdDTO): Promise<boolean> {
        const topic = await this.receive(removeQuestionIdDTO.topicId);
        topic.questionIds = topic.questionIds.filter(id => id !== removeQuestionIdDTO.questionId);
        await this.topicRepository.save(topic);
        await this.questionService.delete(removeQuestionIdDTO.questionId);
        return true;
    }

    async update(topicId: number, updateTopicDTO: UpdateTopicDTO): Promise<Topic> {
        const topic = await this.receive(topicId);

        if (!ValidationService.isNothing(updateTopicDTO.name)) {
            topic.name = updateTopicDTO.name;
        }

        if (!ValidationService.isNothing(updateTopicDTO.organizationId)) {
            topic.organizationId = updateTopicDTO.organizationId;
        }

        await this.topicRepository.save(topic);

        return topic;
    }

    async delete(deleteTopicDTO: DeleteTopicDTO) {
        const topic = await this.receive(deleteTopicDTO.topicId);
        if (topic != null) {
            await this.topicRepository.delete(topic.id);
        }

        return true;
    }
}
