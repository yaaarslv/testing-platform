import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Organization } from './entities/Organization';
import { Teacher } from './entities/Teacher';
import { Student } from './entities/Student';
import { Topic } from './entities/Topic';
import { Question } from './entities/Question';
import { Answer } from './entities/Answer';
import { TestAttempt } from './entities/TestAttempt';
import { AttemptDetail } from './entities/AttemptDetail';
import { AuthService } from './services/AuthService';
import { AuthController } from './controllers/AuthController';
import { User } from './entities/User';
import { OrganizationController } from './controllers/OrganizationController';
import { OrganizationService } from './services/OrganizationService';
import { StudentController } from './controllers/StudentController';
import { StudentService } from './services/StudentService';


@Module({
    imports: [TypeOrmModule.forFeature([Organization, Teacher, Student, Topic, Question, Answer, TestAttempt, AttemptDetail, User]),
        TypeOrmModule.forRoot({
            'type': 'postgres',
            'ssl': true,
            'host': process.env.DB_HOST,
            'username': process.env.DB_USERNAME,
            'password': process.env.DB_PASSWORD,
            'database': process.env.DB_NAME,
            'synchronize': true,
            'logging': false,
            'entities': [Organization, Teacher, Student, Topic, Question, Answer, TestAttempt, AttemptDetail, User],
        })],
    controllers: [AppController, AuthController, OrganizationController, StudentController],
    providers: [AppService, AuthService, OrganizationService, StudentService],
    exports: [TypeOrmModule],
})
export class AppModule {
}
