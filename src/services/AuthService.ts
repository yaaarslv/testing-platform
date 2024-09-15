import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { LoginDTO } from '../dto/LoginDTO';
import { ReturnUserDTO } from '../dto/ReturnUserDTO';
import { ERole } from '../models/ERole';
import { RegisterDTO } from '../dto/RegisterDTO';
import { StudentService } from './StudentService';
import { TeacherService } from './TeacherService';

let bcrypt = require('bcrypt');
const crypto = require('crypto');

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                private readonly studentService: StudentService,
                private readonly teacherService: TeacherService) {
    }

    async login(data: LoginDTO): Promise<ReturnUserDTO> {
        const hashedLogin = crypto.createHash('sha256').update(data.login).digest('hex');
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

    // todo при создании ссылки передаем роль, id студента или препода, название организации и состояние активированности
    async register(data: RegisterDTO): Promise<any> {
        const hashedLogin = crypto.createHash('sha256').update(data.login).digest('hex');

        const user = await this.userRepository.findOneBy({ login: hashedLogin });

        if (user !== null) {
            throw new ConflictException('Пользователь с таким логином уже существует.');
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        let role: ERole;
        if (data.role === 0) {
            role = ERole.Teacher;
        } else if (data.role === 1) {
            role = ERole.Student;
        }

        const newUser = await this.userRepository.save({
            login: hashedLogin,
            password: hashedPassword,
            role: role
        });

        try {
            if (role === ERole.Teacher) {
                await this.teacherService.activate(data.actorId, newUser.id, data.login);
            } else if (role === ERole.Student) {
                await this.studentService.activate(data.actorId, newUser.id, data.login);
            }

            return new ReturnUserDTO(newUser);
        } catch (e: any) {
            await this.userRepository.delete(newUser.id);
            throw e;
        }
    }
}
