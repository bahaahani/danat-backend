import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './enrollment.entity';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Enrollment, User, Course]),
    ],
    controllers: [EnrollmentController],
    providers: [EnrollmentService],
})
export class EnrollmentsModule { }