import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TeacherService } from "../services/TeacherService";
import { CreateTeacherDTO } from "../dto/CreateTeacherDTO";
import { AddGroupsDTO, ReceiveTeacherGroups } from "../dto/AddStudentDTO";
import { Teacher } from "../entities/Teacher";
import { UpdateTeacherDTO } from "../dto/UpdateTeacherDTO";
import { RemoveGroupDTO } from "../dto/RemoveGroupDTO";
import { RemoveTeacherIdDTO } from "../dto/RemoveTeacherIdDTO";
import { Roles, RolesGuard } from "../models/RolesGuard";
import { ERole } from "../models/ERole";

@Controller("api/teacher")
@UseGuards(RolesGuard)
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {
    }

    @Post("create")
    @Roles(ERole.Administrator)
    async create(@Body() createTeacherDTO: CreateTeacherDTO): Promise<Teacher> {
        return await this.teacherService.create(createTeacherDTO);
    }

    @Put("update/:id")
    @Roles(ERole.Administrator)
    async update(@Param("id") id: number, @Body() updateTeacherDTO: UpdateTeacherDTO): Promise<Teacher> {
        return await this.teacherService.update(id, updateTeacherDTO);
    }

    @Delete("delete")
    @Roles(ERole.Administrator)
    async delete(@Body() removeTeacherIdDTO: RemoveTeacherIdDTO): Promise<boolean> {
        return await this.teacherService.delete(removeTeacherIdDTO);
    }

    @Post("add_groups")
    @Roles(ERole.Teacher)
    async addGroups(@Body() addStudentDto: AddGroupsDTO): Promise<boolean> {
        return await this.teacherService.addGroups(addStudentDto);
    }

    @Post("remove_group")
    @Roles(ERole.Teacher)
    async removeGroup(@Body() removeGroupDTO: RemoveGroupDTO): Promise<boolean> {
        return await this.teacherService.removeGroup(removeGroupDTO);
    }

    @Get("groups")
    @Roles(ERole.Teacher)
    async receiveGroups(@Req() req: any): Promise<string[]> {
        return await this.teacherService.receiveGroups(req.user.login);
    }
}
