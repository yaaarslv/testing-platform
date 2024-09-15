import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userID: number;

    @Column({ nullable: false })
    organizationId: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @Column('int', { nullable: true, array: true, default: [] })
    studentIds: number[];


    constructor(userID: number, organizationId: number, name: string, email: string, createdAt: Date, studentIds: number[]) {
        this.userID = userID;
        this.organizationId = organizationId;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.studentIds = studentIds;
    }
}
