import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userID: number;

  @Column({ nullable: false })
  organizationId: number;

  @Column('int', { nullable: true, array: true, default: [] })
  teacherIds: number[];

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  group: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: false, default: false })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor(
    userID: number,
    organizationId: number,
    teacherIds: number[],
    name: string,
    group: string,
    email: string,
    isActive: boolean,
    createdAt: Date,
  ) {
    this.userID = userID;
    this.organizationId = organizationId;
    this.teacherIds = teacherIds;
    this.name = name;
    this.group = group;
    this.email = email;
    this.isActive = isActive;
    this.createdAt = createdAt;
  }
}
