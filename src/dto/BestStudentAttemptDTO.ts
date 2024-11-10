import { Student } from "../entities/Student";
import { TestAttempt } from "../entities/TestAttempt";
import { Test } from "../entities/Test";

export class BestStudentAttemptDTO {
    student: Student;
    usedAttempts: number;
    maxScore: number;
    minTimeSpent: number;

    constructor(student: Student, usedAttempts: number, maxScore: number, minTimeSpent: number) {
        this.student = student;
        this.usedAttempts = usedAttempts;
        this.maxScore = maxScore;
        this.minTimeSpent = minTimeSpent;
    }
}

export class BestStudentsAttempts {
    avgTime: number;
    avgScore: number;
    info: BestStudentAttemptDTO[];
    test: Test

    constructor(avgTime: number, avgScore: number, info: BestStudentAttemptDTO[], test: Test) {
        this.avgTime = avgTime;
        this.avgScore = avgScore;
        this.info = info;
        this.test = test;
    }
}

export class StudentAttempts {
    student: Student;
    usedAttempts: TestAttempt[];
    test: Test;

    constructor(student: Student, usedAttempts: TestAttempt[], test: Test) {
        this.student = student;
        this.usedAttempts = usedAttempts;
        this.test = test;
    }
}