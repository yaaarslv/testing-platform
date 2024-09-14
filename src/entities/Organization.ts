import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false})
  createdAt: Date;


  @Column('int', { nullable: true, array: true })
  teacherIds: number[];

  @Column('int', { nullable: true, array: true })
  studentIds: number[];

  @Column('int', { nullable: true, array: true })
  topicIds: number[];


  constructor(name: string, createdAt: Date, teacherIds: number[], studentIds: number[], topicIds: number[]) {
    this.name = name;
    this.createdAt = createdAt;
    this.teacherIds = teacherIds;
    this.studentIds = studentIds;
    this.topicIds = topicIds;
  }
}
