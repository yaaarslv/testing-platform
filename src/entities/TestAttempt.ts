import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestAttempt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    studentId: number;

    @Column({ nullable: false })
    topicId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    attemptDate: Date;

    @Column({ nullable: false, type: 'float' })
    score: number;

    @Column('int', { nullable: true, array: true, default: [] })
    attemptDetailIds: number[];


    constructor(studentId: number, topicId: number, attemptDate: Date, score: number, attemptDetailIds: number[]) {
        this.studentId = studentId;
        this.topicId = topicId;
        this.attemptDate = attemptDate;
        this.score = score;
        this.attemptDetailIds = attemptDetailIds;
    }
}
