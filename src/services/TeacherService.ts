import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Teacher } from "../entities/Teacher";
import { CreateTeacherDTO } from "../dto/CreateTeacherDTO";
import { AddGroupsDTO, ReceiveTeacherGroups } from "../dto/AddStudentDTO";
import { OrganizationService } from "./OrganizationService";
import { ValidationService } from "./ValidationService";
import { UpdateTeacherDTO } from "../dto/UpdateTeacherDTO";
import { RemoveGroupDTO } from "../dto/RemoveGroupDTO";
import { RemoveTeacherIdDTO } from "../dto/RemoveTeacherIdDTO";

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
        private readonly organizationService: OrganizationService
    ) {
    }

    async create(createTeacherDTO: CreateTeacherDTO): Promise<Teacher> {
        const organization = await this.organizationService.receiveById(createTeacherDTO.organizationId);

        const newTeacher = await this.teacherRepository.save({
            organizationId: createTeacherDTO.organizationId,
            name: createTeacherDTO.name
        });

        await this.organizationService.addTeacher(organization, newTeacher);

        return newTeacher;
    }

    async receive(teacherId: number): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOneBy({ id: teacherId });

        if (teacher === null) {
            throw new NotFoundException("Преподавателя с таким id не существует.");
        }

        return teacher;
    }

    async receiveByUserId(userId: number): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOneBy({ userID: userId });

        if (teacher === null) {
            throw new NotFoundException("Преподавателя с таким id не существует.");
        }

        return teacher;
    }

    async receiveByStudentId(studentId: number): Promise<Teacher[]> {
        return await this.teacherRepository
            .createQueryBuilder("teacher")
            .where(":studentId = ANY(teacher.studentIds)", { studentId })
            .getMany();
    }

    async activate(
        teacherId: number,
        userId: number,
        email: string
    ): Promise<void> {
        const teacher = await this.teacherRepository.findOneBy({ id: teacherId });

        if (teacher === null) {
            throw new NotFoundException("Преподавателя с таким id не существует.");
        }

        teacher.isActive = true;
        teacher.userID = userId;
        teacher.email = email;

        await this.teacherRepository.save(teacher);
    }

    async addGroups(addGroupDTO: AddGroupsDTO): Promise<boolean> {
        const teacher = await this.receive(addGroupDTO.teacherId);

        addGroupDTO.groups.forEach((group) => {
            if (!teacher.groups.includes(group.toUpperCase())) {
                teacher.groups.push(group.toUpperCase());
            }
        });

        await this.teacherRepository.save(teacher);
        return true;
    }

    async removeGroup(removeGroupDTO: RemoveGroupDTO): Promise<boolean> {
        const teacher = await this.receive(removeGroupDTO.teacherId);

        const upperCaseGroup = removeGroupDTO.group.toUpperCase();
        teacher.groups = teacher.groups.filter(existingGroup => existingGroup !== upperCaseGroup);

        await this.teacherRepository.save(teacher);
        return true;
    }

    async receiveGroups(receiveTeacherGroups: ReceiveTeacherGroups): Promise<string[]> {
        const teacher = await this.receive(receiveTeacherGroups.teacherId);
        return teacher.groups;
    }

    async update(teacherId: number, updateTeacherDTO: UpdateTeacherDTO): Promise<Teacher> {
        const teacher = await this.receive(teacherId);

        if (!ValidationService.isNothing(updateTeacherDTO.name)) {
            teacher.name = updateTeacherDTO.name;
        }

        if (!ValidationService.isNothing(updateTeacherDTO.userID)) {
            teacher.userID = updateTeacherDTO.userID;
        }

        if (!ValidationService.isNothing(updateTeacherDTO.isActive)) {
            teacher.isActive = updateTeacherDTO.isActive;
        }

        if (!ValidationService.isNothing(updateTeacherDTO.email)) {
            teacher.email = updateTeacherDTO.email;
        }

        await this.teacherRepository.save(teacher);

        return teacher;
    }

    async delete(removeTeacherIdDTO: RemoveTeacherIdDTO): Promise<boolean> {
        const teacher = await this.receive(removeTeacherIdDTO.teacherId);
        if (teacher != null) {
            await this.teacherRepository.delete(teacher.id);
        }

        await this.organizationService.removeTeacherId(removeTeacherIdDTO);

        return true;
    }
}
