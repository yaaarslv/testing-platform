import { Body, Controller, Post } from "@nestjs/common";
import { CreateTestDTO } from "../dto/CreateTestDTO";
import { TestService } from "../services/TestService";
import { ReceiveTestDTO } from "../dto/ReceiveTestDTO";
import { Test } from "../entities/Test";
import { GenerateTestDTO } from "../dto/GenerateTestDTO";
import { CheckTestDTO, ReturnGeneratedTest } from "../dto/CheckTestDTO";

@Controller("test")
export class TestController {
    constructor(private readonly testService: TestService) {
    }

    @Post("create")
    async create(@Body() createTestDTO: CreateTestDTO): Promise<Test> {
        return await this.testService.create(createTestDTO);
    }

    @Post("receive")
    async receive(@Body() receiveTestDTO: ReceiveTestDTO): Promise<Test[]> {
        return await this.testService.receiveAll(receiveTestDTO);
    }

    @Post("generate")
    async generate(@Body() generateTest: GenerateTestDTO): Promise<ReturnGeneratedTest> {
        return await this.testService.generateTest(generateTest);
    }

    @Post("check")
    async check(@Body() checkTestDTO: CheckTestDTO): Promise<any> {
        return await this.testService.checkTest(checkTestDTO);
    }
}
