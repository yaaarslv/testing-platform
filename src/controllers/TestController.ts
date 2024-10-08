import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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

@Controller("test")
export class TestController {
    constructor(private readonly testService: TestService,
                private readonly testAttemptService: TestAttemptService) {
    }

    @Post("create")
    async create(@Body() createTestDTO: CreateTestDTO): Promise<Test> {
        return await this.testService.create(createTestDTO);
    }

    @Get("receive/:id")
    async receiveById(@Param("id") id: number): Promise<Test> {
        return await this.testService.receiveByTestId(id);
    }

    @Post("receive")
    async receive(@Body() receiveTestDTO: ReceiveTestDTO): Promise<Test[]> {
        return await this.testService.receiveAll(receiveTestDTO);
    }

    @Put("update/:id")
    async update(@Param("id") id: number, @Body() updateTestDTO: UpdateTestDTO): Promise<Test> {
        return await this.testService.update(id, updateTestDTO);
    }

    @Delete("delete")
    async delete(@Body() deleteTestDTO: DeleteTestDTO): Promise<boolean> {
        return await this.testService.delete(deleteTestDTO);
    }

    @Post("generate")
    async generate(@Body() generateTest: GenerateTestDTO): Promise<ReturnGeneratedTest> {
        return await this.testService.generateTest(generateTest);
    }

    @Post("check")
    async check(@Body() checkTestDTO: CheckTestDTO): Promise<boolean> {
        return await this.testService.checkTest(checkTestDTO);
    }

    @Get("attempt/:test_attempt_id")
    async receiveTestAttempt(@Param("test_attempt_id") testAttemptId: number): Promise<any> {
        return await this.testAttemptService.receive(testAttemptId);
    }

    @Post("get_students_best_results")
    async getStudentsResults(@Body() getStudentsResultsDTO: GetStudentsResultsDTO): Promise<BestStudentsAttempts> {
        return await this.testService.getStudentsResults(getStudentsResultsDTO);
    }

    @Post("get_student_results")
    async receiveByStudentIdAndTestIdWithStudent(@Body() receiveByStudentIdAndTestIdWithStudentDTO: ReceiveByStudentIdAndTestIdWithStudentDTO): Promise<StudentAttempts> {
        return await this.testService.receiveByStudentIdAndTestIdWithStudent(receiveByStudentIdAndTestIdWithStudentDTO);
    }
}
