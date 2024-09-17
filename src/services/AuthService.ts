import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { LoginDTO } from '../dto/LoginDTO';
import { ReturnUserDTO } from '../dto/ReturnUserDTO';
import { ERole } from '../models/ERole';
import { RegisterDTO } from '../dto/RegisterDTO';
import { StudentService } from './StudentService';
import { TeacherService } from './TeacherService';
import { GetInviteLinkDTO } from '../dto/GetInviteLinkDTO';
import { CodeLinkService } from './CodeLinkService';
import { OrganizationService } from './OrganizationService';

const bcrypt = require('bcrypt');
const crypto = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly studentService: StudentService,
    private readonly organizationRepository: OrganizationService,
    private readonly teacherService: TeacherService,
  ) {}

  async login(data: LoginDTO): Promise<ReturnUserDTO> {
    const hashedLogin = crypto
      .createHash('sha256')
      .update(data.login)
      .digest('hex');
    const user = await this.userRepository.findOneBy({ login: hashedLogin });

    if (user === null) {
      throw new NotFoundException(
        'Пользователя с таким логином или паролем не существует.',
      );
    }

    if (bcrypt.compareSync(data.password, user.password)) {
      return new ReturnUserDTO(user);
    } else {
      throw new NotFoundException(
        'Пользователя с таким логином или паролем не существует.',
      );
    }
  }

  // todo при создании ссылки передаем роль, id студента или препода, название организации и состояние активированности
  async register(data: RegisterDTO): Promise<any> {
    const hashedLogin = crypto
      .createHash('sha256')
      .update(data.login)
      .digest('hex');

    const user = await this.userRepository.findOneBy({ login: hashedLogin });

    if (user !== null) {
      throw new ConflictException(
        'Пользователь с таким логином уже существует.',
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const newUser = await this.userRepository.save({
      login: hashedLogin,
      password: hashedPassword,
      role: data.role,
    });

    try {
      if (data.role === ERole.Teacher) {
        await this.teacherService.activate(
          data.actorId,
          newUser.id,
          data.login,
        );
      } else if (data.role === ERole.Student) {
        await this.studentService.activate(
          data.actorId,
          newUser.id,
          data.login,
        );
      }

      return new ReturnUserDTO(newUser);
    } catch (e: any) {
      await this.userRepository.delete(newUser.id);
      throw e;
    }
  }

  async getInviteLink(body: GetInviteLinkDTO): Promise<string> {
    return await CodeLinkService.generateInviteLink(
      body.role,
      body.actorId,
      body.orgName,
      body.isActive,
    );
  }

  async checkInviteLink(link: string) {
    try {
      const data: GetInviteLinkDTO = (await CodeLinkService.decrypt(
        link,
      )) as GetInviteLinkDTO;
      console.log(data);

      if (data.role !== ERole.Teacher && data.role !== ERole.Student) {
        return false;
      }

      data.role === ERole.Teacher
        ? await this.teacherService.receive(data.actorId)
        : await this.studentService.receive(data.actorId);

      await this.organizationRepository.receive(data.orgName);
      return true;
    } catch (e) {
      return false;
    }
  }
}
