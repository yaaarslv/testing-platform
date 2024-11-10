import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    topicId: number;

    @Column({ nullable: false })
    questionText: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('int', { nullable: true, array: true, default: [] })
    answerIds: number[];

    constructor(
        topicId: number,
        questionText: string,
        createdAt: Date,
        answerIds: number[],
    ) {
        this.topicId = topicId;
        this.questionText = questionText;
        this.createdAt = createdAt;
        this.answerIds = answerIds;
    }
}
