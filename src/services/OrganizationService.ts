import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Organization } from "../entities/Organization";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrganizationDTO } from "../dto/CreateOrganizationDTO";

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
    ) {
    }

    async create(createOrganizationDTO: CreateOrganizationDTO): Promise<number> {
        const organization = await this.organizationRepository.findOneBy({
            name: createOrganizationDTO.name
        });

        if (organization !== null) {
            throw new ConflictException(
                "Организация с таким названием уже существует."
            );
        }

        const newOrganization = await this.organizationRepository.save({
            name: createOrganizationDTO.name,
            address: createOrganizationDTO.address,
            phone: createOrganizationDTO.phone,
            email: createOrganizationDTO.email,
            responsiblePerson: createOrganizationDTO.responsiblePerson
        });
        return newOrganization.id;
    }

    async receiveByName(name: string): Promise<Organization> {
        const organization = await this.organizationRepository.findOneBy({
            name: name
        });

        if (organization === null) {
            throw new NotFoundException(
                "Организации с таким названием не существует."
            );
        }

        return organization;
    }

    async receiveById(id: number): Promise<Organization> {
        const organization = await this.organizationRepository.findOneBy({
            id: id
        });

        if (organization === null) {
            throw new NotFoundException(
                "Организации с таким названием не существует."
            );
        }

        return organization;
    }

    // async addStudent(addStudentDto: AddStudentDTO): Promise<boolean> {
    //     const organization = await this.organizationRepository.findOneBy({
    //         id: addStudentDto.organizationId
    //     });
    //     if (organization === null) {
    //         throw new NotFoundException("Организации с таким id не существует.");
    //     }
    //
    //     const student = await this.studentService.receive(addStudentDto.studentId);
    //
    //     if (!organization.studentIds.includes(student.id)) {
    //         organization.studentIds.push(student.id);
    //         await this.organizationRepository.save(organization);
    //     }
    //
    //     return true;
    // }
    //
    // async addTeacher(addTeacherDTO: AddTeacherDTO): Promise<boolean> {
    //     const organization = await this.organizationRepository.findOneBy({
    //         id: addTeacherDTO.organizationId
    //     });
    //     if (organization === null) {
    //         throw new NotFoundException("Организации с таким id не существует.");
    //     }
    //
    //     const teacher = await this.teacherService.receive(addTeacherDTO.teacherId);
    //
    //     if (!organization.teacherIds.includes(teacher.id)) {
    //         organization.teacherIds.push(teacher.id);
    //         await this.organizationRepository.save(organization);
    //     }
    //
    //     return true;
    // }
}
