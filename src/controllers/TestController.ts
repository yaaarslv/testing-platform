import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateTestDTO } from "../dto/CreateTestDTO";
import { TestService } from "../services/TestService";
import { ReceiveTestDTO } from "../dto/ReceiveTestDTO";
import { Test } from "../entities/Test";
import { GenerateTestDTO } from "../dto/GenerateTestDTO";
import { CheckTestDTO, ReturnGeneratedTest } from "../dto/CheckTestDTO";
import { TestAttemptService } from "../services/TestAttemptService";
import { GetStudentsResultsDTO } from "../dto/GetStudentsResultsDTO";
import { BestStudentsAttempts, StudentAttempts } from "../dto/BestStudentAttemptDTO";
import { ReceiveByStudentIdAndTestIdWithStudentDTO } from "../dto/ReceiveByStudentIdAndTestIdWithStudentDTO";
import { DeleteTestDTO } from "../dto/DeleteTestDTO";
import { UpdateTestDTO } from "../dto/UpdateTestDTO";
import { Roles, RolesGuard } from "../models/RolesGuard";
import { ERole } from "../models/ERole";
import { Request } from "express";

@Controller("api/test")
@UseGuards(RolesGuard)
export class TestController {
    constructor(private readonly testService: TestService,
                private readonly testAttemptService: TestAttemptService) {
    }

    @Post("create")
    @Roles(ERole.Teacher)
    async create(@Body() createTestDTO: CreateTestDTO): Promise<Test> {
        return await this.testService.create(createTestDTO);
    }

    @Get("receive/:id")
    async receiveById(@Param("id") id: number): Promise<Test> {
        return await this.testService.receiveByTestId(id);
    }

    @Get("receive")
    @Roles(ERole.Teacher, ERole.Student)
    async receive(@Req() req: any): Promise<Test[]> {
        return await this.testService.receiveAll(req.user.login);
    }

    @Put("update/:id")
    @Roles(ERole.Teacher)
    async update(@Param("id") id: number, @Body() updateTestDTO: UpdateTestDTO): Promise<Test> {
        return await this.testService.update(id, updateTestDTO);
    }

    @Delete("delete")
    @Roles(ERole.Teacher)
    async delete(@Body() deleteTestDTO: DeleteTestDTO): Promise<boolean> {
        return await this.testService.delete(deleteTestDTO);
    }

    @Post("generate")
    @Roles(ERole.Student)
    async generate(@Body() generateTest: GenerateTestDTO): Promise<ReturnGeneratedTest> {
        return await this.testService.generateTest(generateTest);
    }

    @Post("check")
    @Roles(ERole.Student)
    async check(@Body() checkTestDTO: CheckTestDTO): Promise<boolean> {
        return await this.testService.checkTest(checkTestDTO);
    }

    @Get("attempt/:test_attempt_id")
    async receiveTestAttempt(@Param("test_attempt_id") testAttemptId: number): Promise<any> {
        return await this.testAttemptService.receive(testAttemptId);
    }

    @Post("get_students_best_results")
    @Roles(ERole.Teacher)
    async getStudentsResults(@Body() getStudentsResultsDTO: GetStudentsResultsDTO): Promise<BestStudentsAttempts> {
        return await this.testService.getStudentsResults(getStudentsResultsDTO);
    }

    @Post("get_student_results")
    @Roles(ERole.Teacher)
    async receiveByStudentIdAndTestIdWithStudent(@Body() receiveByStudentIdAndTestIdWithStudentDTO: ReceiveByStudentIdAndTestIdWithStudentDTO): Promise<StudentAttempts> {
        return await this.testService.receiveByStudentIdAndTestIdWithStudent(receiveByStudentIdAndTestIdWithStudentDTO);
    }
}
