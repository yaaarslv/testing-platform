import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    responsiblePerson: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("int", { nullable: true, array: true, default: [] })
    teacherIds: number[];

    @Column("int", { nullable: true, array: true, default: [] })
    studentIds: number[];

    @Column("int", { nullable: true, array: true, default: [] })
    topicIds: number[];

    constructor(
        name: string,
        address: string,
        phone: string,
        email: string,
        responsiblePerson: string,
        createdAt: Date,
        teacherIds: number[],
        studentIds: number[],
        topicIds: number[]
    ) {
        this.name = name;
        this.address = address;
        this.createdAt = createdAt;
        this.teacherIds = teacherIds;
        this.studentIds = studentIds;
        this.topicIds = topicIds;
        this.phone = phone;
        this.email = email;
        this.responsiblePerson = responsiblePerson;
    }
}
