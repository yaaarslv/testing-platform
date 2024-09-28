import { Body, Controller, Post } from "@nestjs/common";
import { TeacherService } from "../services/TeacherService";
import { CreateTeacherDTO } from "../dto/CreateTeacherDTO";
import { AddGroupDTO, ReceiveTeacherGroups } from "../dto/AddStudentDTO";
import { Teacher } from "../entities/Teacher";

@Controller("teacher")
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {
    }

    @Post("create")
    async create(@Body() createTeacherDTO: CreateTeacherDTO): Promise<Teacher> {
        return await this.teacherService.create(createTeacherDTO);
    }

    @Post("add_groups")
    async addGroup(@Body() addStudentDto: AddGroupDTO): Promise<boolean> {
        return await this.teacherService.addGroup(addStudentDto);
    }

    @Post("groups")
    async receiveGroups(@Body() receiveTeacherGroups: ReceiveTeacherGroups): Promise<string[]> {
        return await this.teacherService.receiveGroups(receiveTeacherGroups);
    }
}
