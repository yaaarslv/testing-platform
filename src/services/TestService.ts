import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Test } from "../entities/Test";
import { CreateTestDTO } from "../dto/CreateTestDTO";
import { ReceiveTestDTO } from "../dto/ReceiveTestDTO";
import { AuthService } from "./AuthService";
import { ERole } from "../models/ERole";
import { TeacherService } from "./TeacherService";
import { StudentService } from "./StudentService";
import { GenerateTestDTO } from "../dto/GenerateTestDTO";

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test) private testRepository: Repository<Test>,
        private readonly authService: AuthService,
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService
    ) {
    }

    async create(createTestDTO: CreateTestDTO): Promise<Test> {
        return await this.testRepository.save({
            testName: createTestDTO.testName,
            topic: createTestDTO.topicId,
            teacher: createTestDTO.teacherId,
            questionCount: createTestDTO.questionCount,
            attempts: createTestDTO.attempts
        });
    }

    async receiveAll(receiveTestDTO: ReceiveTestDTO): Promise<Test[]> {
        const login = receiveTestDTO.login;
        const user = await this.authService.receiveUser(login);

        if (user.role === ERole.Teacher) {
            const teacher = await this.teacherService.receiveByUserId(user.id);
            return await this.receiveByTeacherId(teacher.id);
        } else if (user.role === ERole.Student) {
            const student = await this.studentService.receiveByUserId(user.id);
            const teachersOfStudent = await this.teacherService.receiveByStudentId(student.id);
            let tests: Test[] = [];

            for (const t of teachersOfStudent) {
                const tTests = await this.receiveByTeacherId(t.id);
                tests = tests.concat(tTests);
            }

            return tests;
        }
    }

    async receiveByTeacherId(teacherId: number) {
        return await this.testRepository.find({ where: { teacher: teacherId }, relations: ["teacher", "topic"] });
    }

    async generateTest(generateTestDTO: GenerateTestDTO) {

    }

    async checkTest() {

    }
}
