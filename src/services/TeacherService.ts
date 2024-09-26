import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Teacher } from "../entities/Teacher";
import { CreateTeacherDTO } from "../dto/CreateTeacherDTO";
import { AddGroupDTO, ReceiveTeacherGroups } from "../dto/AddStudentDTO";

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>
    ) {
    }

    async create(createTeacherDTO: CreateTeacherDTO): Promise<number> {
        const newTeacher = await this.teacherRepository.save({
            organizationId: createTeacherDTO.organizationId,
            name: createTeacherDTO.name
        });
        return newTeacher.id;
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

    async addGroup(addGroupDTO: AddGroupDTO): Promise<boolean> {
        const teacher = await this.receive(addGroupDTO.teacherId);

        addGroupDTO.groups.forEach((group) => {
            if (!teacher.groups.includes(group.toUpperCase())) {
                teacher.groups.push(group.toUpperCase());
            }
        })

        await this.teacherRepository.save(teacher);
        return true;
    }

    async receiveGroups(receiveTeacherGroups: ReceiveTeacherGroups): Promise<string[]> {
        const teacher = await this.receive(receiveTeacherGroups.teacherId);
        return teacher.groups;
    }
}
