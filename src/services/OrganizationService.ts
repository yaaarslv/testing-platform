import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/Organization';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { StudentService } from './StudentService';
import { AddStudentDTO } from '../dto/AddStudentDTO';
import { AddTeacherDTO } from '../dto/AddTeacherDTO';

export class OrganizationService {
    constructor(@InjectRepository(Organization) private organizationRepository: Repository<Organization>,
                private readonly studentService: StudentService) {
    }

    async create(name: string): Promise<number> {
        const organization = await this.organizationRepository.findOneBy({ name: name });

        if (organization !== null) {
            throw new ConflictException('Организация с таким названием уже существует.');
        }

        const newOrganization = await this.organizationRepository.save({ name: name });
        return newOrganization.id;
    }

    async addStudent(addStudentDto: AddStudentDTO): Promise<boolean> {
        const organization = await this.organizationRepository.findOneBy({ id: addStudentDto.organizationId });
        if (organization === null) {
            throw new NotFoundException('Организации с таким id не существует.');
        }

        const student = await this.studentService.receive(addStudentDto.studentId);

        if (!organization.studentIds.includes(student.id)) {
            organization.studentIds.push(student.id);
            await this.organizationRepository.save(organization);
        }

        return true;
    }

//     async addTeacher(addTeacherDTO: AddTeacherDTO): Promise<boolean> {
//         const organization = await this.organizationRepository.findOneBy({ id: addTeacherDTO.organizationId });
//         if (organization === null) {
//             throw new NotFoundException('Организации с таким id не существует.');
//         }
// // todo сделать сервис учителей и проверить добавление
//         const student = await this.studentService.receive(addStudentDto.studentId);
//
//         organization.studentIds.push(student.id);
//         await this.organizationRepository.save(organization);
//         return true;
//     }
}