import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) { }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }

  async enrollInCourse(userId: number, courseId: number): Promise<Enrollment> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    const enrollment = this.enrollmentRepository.create({
      user,
      course,
      enrollmentDate: new Date(),
      status: 'active',
      progress: 0,
    });
    return this.enrollmentRepository.save(enrollment);
  }

  async updateCourseProgress(enrollmentId: number, userId: number, progress: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: enrollmentId, user: { id: userId } },
      relations: ['user', 'course'],
    });
    if (enrollment) {
      enrollment.progress = progress;
      return this.enrollmentRepository.save(enrollment);
    } else {
      throw new Error('Enrollment not found or not owned by the current user');
    }
  }
}