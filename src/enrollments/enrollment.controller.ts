import { Body, Controller, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './enrollment.entity.ts';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) { }

  @Get('user')
  @Roles('student')
  async getUserEnrollments(@Request() req): Promise<Enrollment[]> {
    return this.enrollmentService.getUserEnrollments(req.user.id);
  }

  @Post()
  @Roles('student')
  async enrollInCourse(@Request() req, @Body() { courseId }: { courseId: number }): Promise<Enrollment> {
    return this.enrollmentService.enrollInCourse(req.user.id, courseId);
  }

  @Put(':enrollmentId/progress')
  @Roles('student')
  async updateCourseProgress(@Param('enrollmentId') enrollmentId: number, @Request() req, @Body() { progress }: { progress: number }): Promise<Enrollment> {
    return this.enrollmentService.updateCourseProgress(enrollmentId, req.user.id, progress);
  }
}