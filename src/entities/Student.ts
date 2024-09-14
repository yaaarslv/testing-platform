import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  userID: number;

  @Column({ nullable: false })
  organizationId: number;

  @Column('int', { nullable: true, array: true })
  teacherIds: number[];

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  group: string;

  @Column({ nullable: false })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  constructor(userID: number, organizationId: number, teacherIds: number[], name: string, group: string, email: string, createdAt: Date) {
    this.userID = userID;
    this.organizationId = organizationId;
    this.teacherIds = teacherIds;
    this.name = name;
    this.group = group;
    this.email = email;
    this.createdAt = createdAt;
  }
}
