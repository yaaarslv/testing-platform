import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Test } from "../entities/Test";
import { CreateTestDTO } from "../dto/CreateTestDTO";

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test) private testRepository: Repository<Test>
    ) {
    }

    async create(createTestDTO: CreateTestDTO): Promise<Test> {
        return await this.testRepository.save({
            testName: createTestDTO.testName,
            topicId: createTestDTO.topicId,
            teacherId: createTestDTO.teacherId,
            questionCount: createTestDTO.questionCount,
            attempts: createTestDTO.attempts
        });
    }

    // async receive(teacherId: number): Promise<Teacher> {
    //     const teacher = await this.teacherRepository.findOneBy({ id: teacherId });
    //
    //     if (teacher === null) {
    //         throw new NotFoundException("Преподавателя с таким id не существует.");
    //     }
    //
    //     return teacher;
    // }
    //
    // async activate(
    //     teacherId: number,
    //     userId: number,
    //     email: string
    // ): Promise<void> {
    //     const teacher = await this.teacherRepository.findOneBy({ id: teacherId });
    //
    //     if (teacher === null) {
    //         throw new NotFoundException("Преподавателя с таким id не существует.");
    //     }
    //
    //     teacher.isActive = true;
    //     teacher.userID = userId;
    //     teacher.email = email;
    //
    //     await this.teacherRepository.save(teacher);
    // }
}
