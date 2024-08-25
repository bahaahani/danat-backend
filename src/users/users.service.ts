import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        console.log('createUserDto in UsersService:', createUserDto); // Add logging
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find({
            select: ['id', 'email', 'password', 'role', 'enrollments'],
        });
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['enrollments'],
        });
    }

    async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User> {
        await this.usersRepository.update(id, updateUserDto);
        return this.findById(id);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async changePassword(id: number, oldPassword: string, newPassword: string): Promise<User> {
        const user = await this.findById(id);
        if (user) {
            user.password = newPassword; // You should hash the password before saving
            await this.usersRepository.save(user);
        }
        return user;
    }

    async updateEmailPreferences(id: number, preferences: string): Promise<User> {
        const user = await this.findById(id);
        if (user) {
            user.preferences = preferences; // Assuming emailPreferences is a field in User entity
            await this.usersRepository.save(user);
        }
        return user;
    }

    async getCourseHistory(id: number): Promise<any[]> {
        const user = await this.findById(id);
        if (user) {
            return user.enrollments; // Assuming enrollments is a relation in User entity
        }
        return [];
    }
}