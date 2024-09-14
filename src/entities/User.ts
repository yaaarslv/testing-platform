import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ERole } from '../models/ERole';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, type: "enum", enum: ERole, default: ERole.User})
  role: ERole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  constructor(login: string, password: string, role: ERole, createdAt: Date) {
    this.login = login;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}
