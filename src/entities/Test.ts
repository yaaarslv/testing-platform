import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Teacher } from "./Teacher";
import { Topic } from "./Topic";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    testName: string;

    @ManyToOne(() => Topic, { nullable: false })
    topic: number;

    @ManyToOne(() => Teacher, { nullable: false })
    teacher: number;

    @Column({ nullable: false })
    questionCount: number;

    @Column({ nullable: false })
    attempts: number;

    @Column({ nullable: false })
    group: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    constructor(
        testName: string,
        topicId: number,
        teacherId: number,
        createdAt: Date
    ) {
        this.testName = testName;
        this.topic = topicId;
        this.teacher = teacherId;
        this.createdAt = createdAt;
    }
}
