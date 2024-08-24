import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/user.entity';
import { Payment } from '../payments/payment.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) { }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['categories', 'enrollments', 'reviews'] });
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    return this.courseRepository.save(course);
  }

  async updateCourse(id: number, course: Partial<Course>): Promise<Course> {
    await this.courseRepository.update(id, course);
    return this.courseRepository.findOne({ where: { id }, relations: ['categories', 'enrollments', 'reviews'] });
  }

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['enrollments', 'payments', 'notifications'] });
  }

  async updateUserStatus(id: number, status: string): Promise<User | null> {
    const result = await this.userRepository.update(id, { status });

    if (result.affected === 0) {
      // Handle the case where no rows were updated (e.g., user not found)
      return null;
    }

    return this.userRepository.findOne({ where: { id } });
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['user', 'course'] });
  }

  async getSystemStatistics(): Promise<{ userCount: number; courseCount: number; revenueTotal: number }> {
    const userCount = await this.userRepository.count();
    const courseCount = await this.courseRepository.count();
    const revenueTotal = await this.paymentRepository.sum('amount');
    return { userCount, courseCount, revenueTotal };
  }
}