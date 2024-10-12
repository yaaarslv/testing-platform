import { CheckQuestionDTO, ReturnQuestionDTO } from "./QuestionsDTO";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CheckTestDTO {
    @IsNumber()
    @IsNotEmpty()
    testId: number;

    @IsArray()
    @IsNotEmpty()
    answers: CheckQuestionDTO[];
}

export class ReturnGeneratedTest {
    testId: number;
    questions: ReturnQuestionDTO[];

    constructor(testId: number, questions: ReturnQuestionDTO[]) {
        this.testId = testId;
        this.questions = questions;
    }
}
