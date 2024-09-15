import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        throw new NotFoundException('Пользователя с таким логином или паролем не существует.');
    }
}
