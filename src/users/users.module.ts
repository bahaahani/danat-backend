import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'yourSecretKey',
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [UserController],
    providers: [UsersService], 
    exports: [UsersService, JwtModule],
})
export class UsersModule { }