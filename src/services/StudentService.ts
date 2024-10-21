import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Student } from "../entities/Student";
import { CreateStudentDTO } from "../dto/CreateStudentDTO";
import { OrganizationService } from "./OrganizationService";
import { ValidationService } from "./ValidationService";
import { UpdateStudentDTO } from "../dto/UpdateStudentDTO";
import { RemoveStudentIdDTO } from "../dto/RemoveStudentIdDTO";
import { ActivateActorDTO } from "../dto/ActivateActorDTO";

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

    async update(studentId: number, updateStudentDTO: UpdateStudentDTO): Promise<Student> {
        const student = await this.receive(studentId);

        if (!ValidationService.isNothing(updateStudentDTO.name)) {
            student.name = updateStudentDTO.name;
        }

        if (!ValidationService.isNothing(updateStudentDTO.userID)) {
            student.userID = updateStudentDTO.userID;
        }

        if (!ValidationService.isNothing(updateStudentDTO.email)) {
            student.email = updateStudentDTO.email;
        }

        if (!ValidationService.isNothing(updateStudentDTO.group)) {
            student.group = updateStudentDTO.group;
        }

        await this.studentRepository.save(student);

        return student;
    }

    async delete(removeStudentIdDTO: RemoveStudentIdDTO): Promise<boolean> {
        const student = await this.receive(removeStudentIdDTO.studentId);
        if (student != null) {
            await this.studentRepository.delete(student.id);
        }

        await this.organizationService.removeStudentId(removeStudentIdDTO);

        return true;
    }
}
