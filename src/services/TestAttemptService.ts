import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { TestAttempt } from "../entities/TestAttempt";

export class TestAttemptService {
    constructor(@InjectRepository(TestAttempt) private testAttemptRepository: Repository<TestAttempt>) {
    }

    async create(studentId: number, topicId: number, score: number, testId: number): Promise<TestAttempt> {
        return await this.testAttemptRepository.save({
            studentId: studentId,
            topicId: topicId,
            score: score,
            test: testId
        });
    }

    async receive(testAttemptId: number): Promise<TestAttempt> {
        const testAttempt = await this.testAttemptRepository.findOne({where: { id: testAttemptId }, relations: ["test"]});

        if (testAttempt === null) {
            throw new NotFoundException("Попытки решения теста с таким id не существует.");
        }

        return testAttempt;
    }

    async receiveUsedAttemptsByStudentIdAndTestId(studentId: number, testId: number): Promise<number> {
        return await this.testAttemptRepository.countBy({studentId: studentId, test: testId});
    }
}
