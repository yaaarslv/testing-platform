import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    answerText: string;

    @Column({ default: false })
    isCorrect: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    constructor(
        answerText: string,
        isCorrect: boolean,
        createdAt: Date
    ) {
        this.answerText = answerText;
        this.isCorrect = isCorrect;
        this.createdAt = createdAt;
    }
}
