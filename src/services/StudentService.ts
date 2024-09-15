import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Student } from '../entities/Student';
import { CreateStudentDTO } from '../dto/CreateStudentDTO';

export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {
    }

    async create(createStudentDTO: CreateStudentDTO): Promise<number> {
        const newStudent = await this.studentRepository.save({
            organizationId: createStudentDTO.organizationId,
            name: createStudentDTO.name,
            group: createStudentDTO.group,
        });
        return newStudent.id;
    }

    async receive(studentId: number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id: studentId });

        if (student === null) {
            throw new NotFoundException('Студента с таким id не существует.');
        }

        return student;
    }

    async activate(studentId: number, userId: number, email: string): Promise<void> {
        const student = await this.studentRepository.findOneBy({ id: studentId });

        if (student === null) {
            throw new NotFoundException('Студента с таким id не существует.');
        }

        student.isActive = true;
        student.userID = userId;
        student.email = email;

        await this.studentRepository.save(student);
    }
}