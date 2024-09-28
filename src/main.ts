import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { Email } from "./models/Email";

const dotenv = require('dotenv');

async function bootstrap() {
  dotenv.config({ path: 'env/.env' });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  const email = new Email();
  await email.sendMail("Тест", "savenkovyaroslav53@gmail.com", "Тестовое письмо");
}

bootstrap();
