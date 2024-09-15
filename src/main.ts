import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { CodeLinkService } from './services/CodeLinkService';
import { ERole } from './models/ERole';

const dotenv = require('dotenv');

async function bootstrap() {
    dotenv.config({ path: 'env/.env' });
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    const inviteLink = await CodeLinkService.generateInviteLink(ERole.Student, 1, 'MyOrg', true);
    console.log('Encrypted Invite Link:', inviteLink);

    const decryptedParams = await CodeLinkService.decrypt(inviteLink);
    console.log('Decrypted Params:', decryptedParams);
}

bootstrap();
