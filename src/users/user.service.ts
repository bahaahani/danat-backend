import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  async changePassword(id: number, oldPassword: string, newPassword: string): Promise<User> {
    const user = await this.findOne(id);
    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      return this.update(id, { password: hashedPassword });
    } else {
      throw new Error('Incorrect old password');
    }
  }

  async updateEmailPreferences(id: number, preferences: string): Promise<User> {
    return this.update(id, { preferences });
  }

  async getCourseHistory(userId: number): Promise<any[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['enrollments', 'enrollments.course'],
    });
    return user.enrollments.map(enrollment => ({
      courseId: enrollment.course.id,
      courseTitle: enrollment.course.title,
      enrollmentDate: enrollment.enrollmentDate,
      status: enrollment.status,
      progress: enrollment.progress,
    }));
  }
}