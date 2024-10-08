import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { AttemptDetail } from "../entities/AttemptDetail";

export class AttemptDetailService {
    constructor(@InjectRepository(AttemptDetail) private attemptDetailRepository: Repository<AttemptDetail>) {
    }

    async create(testAttemptId: number, questionId: number, selectedAnswerId: number): Promise<AttemptDetail> {
        return await this.attemptDetailRepository.save({
            testAttemptId: testAttemptId,
            questionId: questionId,
            selectedAnswerId: selectedAnswerId
        });
    }

    async receive(attemptDetailId: number): Promise<AttemptDetail> {
        const attemptDetail = await this.attemptDetailRepository.findOneBy({ id: attemptDetailId });

        if (attemptDetail === null) {
            throw new NotFoundException("Попытка с таким id не существует.");
        }

        return attemptDetail;
    }
}
