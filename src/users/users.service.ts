import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [];

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    createUser(user: User): User {
        const newUser: User = {
            id: Math.random().toString(),
            ...user,
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: string, updatedUser: User): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = {
                id,
                ...updatedUser,
            };
            return this.users[userIndex];
        }
        return undefined;
    }

    deleteUser(id: string): boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }
}