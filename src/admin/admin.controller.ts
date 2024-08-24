import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/user.entity';
import { Payment } from '../payments/payment.entity';

@Controller('api/admin')
@UseGuards()

export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('courses')
  async getAllCourses(): Promise<Course[]> {
    return this.adminService.getAllCourses();
  }

  @Post('courses')
  async createCourse(@Body() course: Partial<Course>): Promise<Course> {
    return this.adminService.createCourse(course);
  }

  @Put('courses/:id')
  async updateCourse(
    @Param('id') id: number,
    @Body() course: Partial<Course>,
  ): Promise<Course> {
    return this.adminService.updateCourse(id, course);
  }

  @Delete('courses/:id')
  async deleteCourse(@Param('id') id: number): Promise<void> {
    return this.adminService.deleteCourse(id);
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.adminService.getAllUsers();
  }

  @Put('users/:id/status')
  async updateUserStatus(
    @Param('id') id: number,
    @Body() { status }: { status: string },
  ): Promise<User> {
    return this.adminService.updateUserStatus(id, status);
  }

  @Get('payments')
  async getAllPayments(): Promise<Payment[]> {
    return this.adminService.getAllPayments();
  }

  @Get('statistics')
  async getSystemStatistics(): Promise<{
    userCount: number;
    courseCount: number;
    revenueTotal: number;
  }> {
    return this.adminService.getSystemStatistics();
  }
}
