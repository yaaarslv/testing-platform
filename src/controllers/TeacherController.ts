import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { TeacherService } from "../services/TeacherService";
import { CreateTeacherDTO } from "../dto/CreateTeacherDTO";
import { AddGroupsDTO, ReceiveTeacherGroups } from "../dto/AddStudentDTO";
import { Teacher } from "../entities/Teacher";
import { UpdateTeacherDTO } from "../dto/UpdateTeacherDTO";
import { DeleteTeacherDTO } from "../dto/DeleteTeacherDTO";
import { RemoveGroupDTO } from "../dto/RemoveGroupDTO";

@Controller("teacher")
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {
    }

    @Post("create")
    async create(@Body() createTeacherDTO: CreateTeacherDTO): Promise<Teacher> {
        return await this.teacherService.create(createTeacherDTO);
    }

    @Put("update/:id")
    async update(@Param("id") id: number, @Body() updateTeacherDTO: UpdateTeacherDTO): Promise<Teacher> {
        return await this.teacherService.update(id, updateTeacherDTO);
    }

    @Delete("delete")
    async delete(@Body() deleteTeacherDTO: DeleteTeacherDTO): Promise<boolean> {
        return await this.teacherService.delete(deleteTeacherDTO);
    }

    @Post("add_groups")
    async addGroups(@Body() addStudentDto: AddGroupsDTO): Promise<boolean> {
        return await this.teacherService.addGroups(addStudentDto);
    }

    @Post("remove_group")
    async removeGroup(@Body() removeGroupDTO: RemoveGroupDTO): Promise<boolean> {
        return await this.teacherService.removeGroup(removeGroupDTO);
    }

    @Post("groups")
    async receiveGroups(@Body() receiveTeacherGroups: ReceiveTeacherGroups): Promise<string[]> {
        return await this.teacherService.receiveGroups(receiveTeacherGroups);
    }
}
