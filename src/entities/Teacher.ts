import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: false, default: false })
    isActive: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("varchar", { nullable: true, array: true, default: [] })
    groups: string[];

    constructor(
        userID: number,
        organizationId: number,
        name: string,
        email: string,
        createdAt: Date,
        groups: string[]
    ) {
        this.userID = userID;
        this.organizationId = organizationId;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.groups = groups;
    }
}
