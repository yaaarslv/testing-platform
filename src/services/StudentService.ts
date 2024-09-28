import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Student } from "../entities/Student";
import { CreateStudentDTO } from "../dto/CreateStudentDTO";
import { OrganizationService } from "./OrganizationService";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
        private readonly organizationService: OrganizationService
    ) {
    }

    async create(createStudentDTO: CreateStudentDTO): Promise<Student> {
        const organization = await this.organizationService.receiveById(createStudentDTO.organizationId);

        const newStudent = await this.studentRepository.save({
            organizationId: createStudentDTO.organizationId,
            name: createStudentDTO.name,
            group: createStudentDTO.group.toUpperCase()
        });

        await this.organizationService.addStudent(organization, newStudent);

        return newStudent;
    }

    async receive(studentId: number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id: studentId });

        if (student === null) {
            throw new NotFoundException("Студента с таким id не существует.");
        }

        return student;
    }

    async receiveByUserId(userId: number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ userID: userId });

        if (student === null) {
            throw new NotFoundException("Студента с таким id не существует.");
        }

        return student;
    }

    async activate(
        studentId: number,
        userId: number,
        email: string
    ): Promise<void> {
        const student = await this.studentRepository.findOneBy({ id: studentId });

        if (student === null) {
            throw new NotFoundException("Студента с таким id не существует.");
        }

        student.isActive = true;
        student.userID = userId;
        student.email = email;

        await this.studentRepository.save(student);
    }

    async receiveAllGroups(): Promise<string[]> {
        const groups = [];
        const result = await this.studentRepository
            .createQueryBuilder("student")
            .select("DISTINCT student.group")
            .getRawMany();

        result.forEach((r) => {
            groups.push(r.group);
        });

        return groups;
    }
}
