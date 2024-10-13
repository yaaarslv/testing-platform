import { Test } from "../entities/Test";
import { Expose } from "class-transformer";

export class TestWithUsedAttempts extends Test {
    @Expose()
    usedAttempts: number;

    constructor(test: Test, usedAttempts: number) {
        super();
        Object.assign(this, test);
        this.usedAttempts = usedAttempts;
    }
}