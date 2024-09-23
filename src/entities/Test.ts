import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    testName: string;

    @Column({ nullable: false })
    topicId: number;

    @Column({ nullable: false })
    teacherId: number;

    @Column({ nullable: false })
    questionCount: number;

    @Column({ nullable: false })
    attempts: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    constructor(
        testName: string,
        topicId: number,
        teacherId: number,
        createdAt: Date
    ) {
        this.testName = testName;
        this.topicId = topicId;
        this.teacherId = teacherId;
        this.createdAt = createdAt;
    }
}
