import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllReviewsByCourse(courseId: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { course: { id: courseId } }, relations: ['user'] });
  }

  async createReview(courseId: number, userId: number, review: Partial<Review>): Promise<Review> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return this.reviewRepository.save({ ...review, course, user, createdAt: new Date() });
  }

  async updateReview(courseId: number, reviewId: number, userId: number, review: Partial<Review>): Promise<Review> {
    const existingReview = await this.reviewRepository.findOne({
      where: { id: reviewId, course: { id: courseId }, user: { id: userId } },
    });
    if (existingReview) {
      await this.reviewRepository.update(reviewId, review);
      return this.reviewRepository.findOne({ where: { id: reviewId } });
    } else {
      throw new Error('Review not found or not authored by the current user');
    }
  }

  async deleteReview(courseId: number, reviewId: number, userId: number): Promise<void> {
    const existingReview = await this.reviewRepository.findOne({
      where: { id: reviewId, course: { id: courseId }, user: { id: userId } },
    });
    if (existingReview) {
      await this.reviewRepository.delete(reviewId);
    } else {
      throw new Error('Review not found or not authored by the current user');
    }
  }
}