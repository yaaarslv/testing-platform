import { Body, Controller, Post } from '@nestjs/common';
import { TeacherService } from '../services/TeacherService';
import { CreateTeacherDTO } from '../dto/CreateTeacherDTO';

@Controller("teacher")
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {
    }

    @Post("create")
    async create(@Body() createTeacherDTO: CreateTeacherDTO): Promise<number> {
        return await this.teacherService.create(createTeacherDTO);
    }
}
