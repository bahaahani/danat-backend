import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment, User, Course]),
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentsModule { }