import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Recover {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    uuid: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    constructor(
        email: string,
        code: string,
        createdAt: Date
    ) {
        this.email = email;
        this.uuid = code;
        this.createdAt = createdAt;
    }
}
