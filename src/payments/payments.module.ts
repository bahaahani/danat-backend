import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { JwtModule } from '@nestjs/jwt'; // Ensure JwtModule is imported

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment, User, Course]),
        JwtModule.register({
            secret: 'yourSecretKey', // Ensure this matches the secret key used in UsersModule
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentsModule { }