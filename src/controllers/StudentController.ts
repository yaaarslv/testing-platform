import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StudentService } from "../services/StudentService";
import { CreateStudentDTO } from "../dto/CreateStudentDTO";
import { Student } from "../entities/Student";
import { UpdateStudentDTO } from "../dto/UpdateStudentDTO";
import { RemoveStudentIdDTO } from "../dto/RemoveStudentIdDTO";

@Controller("student")
export class StudentController {
    constructor(private readonly studentService: StudentService) {
    }

    @Post("create")
    async create(@Body() createStudentDTO: CreateStudentDTO): Promise<Student> {
        return await this.studentService.create(createStudentDTO);
    }

    @Put("update/:id")
    async update(@Param("id") id: number, @Body() updateStudentDTO: UpdateStudentDTO): Promise<Student> {
        return await this.studentService.update(id, updateStudentDTO);
    }

    @Delete("delete")
    async delete(@Body() removeStudentIdDTO: RemoveStudentIdDTO): Promise<boolean> {
        return await this.studentService.delete(removeStudentIdDTO);
    }

    @Get("receive/groups")
    async receiveAllGroups(): Promise<string[]> {
        return await this.studentService.receiveAllGroups();
    }
}
