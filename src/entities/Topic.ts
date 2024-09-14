import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  organizationId: number;

  @Column({nullable: false})
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('int', { nullable: true, array: true })
  questions: number[];


  constructor(organizationId: number, name: string, createdAt: Date, questions: number[]) {
    this.organizationId = organizationId;
    this.name = name;
    this.createdAt = createdAt;
    this.questions = questions;
  }
}
