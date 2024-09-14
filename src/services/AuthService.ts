import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { LoginDTO } from '../dto/LoginDTO';
import { ReturnUserDTO } from '../dto/ReturnUserDTO';
import { ERole } from '../models/ERole';

let bcrypt = require('bcrypt');
const crypto = require('crypto');

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async login(data: LoginDTO): Promise<ReturnUserDTO> {
        const hashedLogin =  crypto.createHash('sha256').update(data.login).digest('hex');
        const user = await this.userRepository.findOneBy({ login: hashedLogin });

        if (user === null) {
            throw new NotFoundException('Пользователя с таким логином или паролем не существует.');
        }

        if (bcrypt.compareSync(data.password, user.password)) {
            return new ReturnUserDTO(user);
        } else {
            throw new NotFoundException('Пользователя с таким логином или паролем не существует.');
        }
    }

    async register(data: LoginDTO): Promise<any> {
        const hashedLogin =  crypto.createHash('sha256').update(data.login).digest('hex');

        const user = await this.userRepository.findOneBy({ login: hashedLogin });

        if (user !== null) {
            throw new ConflictException('Пользователь с таким логином уже существует.');
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        const newUser = await this.userRepository.save({login: hashedLogin, password: hashedPassword, role: ERole.User});
        return new ReturnUserDTO(newUser);
    }
}
