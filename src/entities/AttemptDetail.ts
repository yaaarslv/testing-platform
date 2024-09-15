import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AttemptDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    testAttemptId: number;

    @Column({ nullable: false })
    questionId: number;

    @Column({ nullable: false })
    selectedAnswerId: number;


    constructor(testAttemptId: number, questionId: number, selectedAnswerId: number) {
        this.testAttemptId = testAttemptId;
        this.questionId = questionId;
        this.selectedAnswerId = selectedAnswerId;
    }
}
