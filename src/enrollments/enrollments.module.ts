import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './enrollment.entity';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { JwtModule } from '@nestjs/jwt'; // Ensure JwtModule is imported

@Module({
    imports: [
        TypeOrmModule.forFeature([Enrollment, User, Course]),
        JwtModule.register({
            secret: 'yourSecretKey', // Ensure this matches the secret key used in other modules
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [EnrollmentController],
    providers: [EnrollmentService],
})
export class EnrollmentsModule { }