import { ERole } from '../models/ERole';
import { User } from '../entities/User';

export class ReturnUserDTO {
  id: number;
  login: string;
  role: ERole;

  constructor(user: User) {
    this.id = user.id;
    this.login = user.login;
    this.role = user.role;
  }
}
