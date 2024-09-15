import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    siteUrl: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;

    @Column('int', { nullable: true, array: true, default: [] })
    teacherIds: number[];

    @Column('int', { nullable: true, array: true, default: [] })
    studentIds: number[];

    @Column('int', { nullable: true, array: true, default: [] })
    topicIds: number[];


    constructor(name: string, description: string, address: string, siteUrl: string, createdAt: Date, teacherIds: number[], studentIds: number[], topicIds: number[]) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.siteUrl = siteUrl;
        this.createdAt = createdAt;
        this.teacherIds = teacherIds;
        this.studentIds = studentIds;
        this.topicIds = topicIds;
    }
}
