import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
const dotenv = require('dotenv');

async function bootstrap() {
  dotenv.config({ path: 'env/.env' });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
