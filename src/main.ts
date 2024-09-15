import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
const dotenv = require('dotenv');
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    dotenv.config({ path: 'env/.env' });
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}

bootstrap();
