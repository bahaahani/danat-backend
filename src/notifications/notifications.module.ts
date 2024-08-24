import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt'; // Ensure JwtModule is imported

@Module({
    imports: [
        TypeOrmModule.forFeature([Notification, User]),
        JwtModule.register({
            secret: 'yourSecretKey', // Ensure this matches the secret key used in other modules
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationsModule { }