import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  questionId: number;

  @Column({nullable: false})
  answerText: string;

  @Column({ default: false })
  isCorrect: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  constructor(questionId: number, answerText: string, isCorrect: boolean, createdAt: Date) {
    this.questionId = questionId;
    this.answerText = answerText;
    this.isCorrect = isCorrect;
    this.createdAt = createdAt;
  }
}
