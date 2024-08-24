import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.entity';

@Controller('api/courses/:courseId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Get()
  async getAllReviews(@Param('courseId') courseId: number): Promise<Review[]> {
    return this.reviewService.getAllReviewsByCourse(courseId);
  }

  @Post()
  async createReview(@Param('courseId') courseId: number, @Request() req, @Body() review: Partial<Review>): Promise<Review> {
    return this.reviewService.createReview(courseId, req.user.id, review);
  }

  @Put(':reviewId')
  async updateReview(@Param('courseId') courseId: number, @Param('reviewId') reviewId: number, @Request() req, @Body() review: Partial<Review>): Promise<Review> {
    return this.reviewService.updateReview(courseId, reviewId, req.user.id, review);
  }

  @Delete(':reviewId')
  async deleteReview(@Param('courseId') courseId: number, @Param('reviewId') reviewId: number, @Request() req): Promise<void> {
    return this.reviewService.deleteReview(courseId, reviewId, req.user.id);
  }
}