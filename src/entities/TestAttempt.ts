import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Test } from "./Test";

@Entity()
export class TestAttempt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    studentId: number;

    @Column({ nullable: false })
    topicId: number;

    @ManyToOne(() => Test, { nullable: false })
    test: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    attemptDate: Date;

    @Column({ nullable: false })
    score: number;

    @Column({ nullable: false })
    timeSpent: number;

    constructor(
        studentId: number,
        topicId: number,
        attemptDate: Date,
        score: number,
        testId: number,
        timeSpent: number
    ) {
        this.studentId = studentId;
        this.topicId = topicId;
        this.attemptDate = attemptDate;
        this.score = score;
        this.test = testId;
        this.timeSpent = timeSpent;
    }
}
