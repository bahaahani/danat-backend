import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Get()
  async getCourses(@Query() query): Promise<Course[]> {
    return this.courseService.getCourses(query);
  }

  @Get(':id')
  async getCourseById(@Param('id') id: number): Promise<Course> {
    return this.courseService.getCourseById(id);
  }

  @Post()
  @Roles('admin')
  async createCourse(@Body() course: Partial<Course>): Promise<Course> {
    return this.courseService.createCourse(course);
  }

  @Put(':id')
  @Roles('admin')
  async updateCourse(@Param('id') id: number, @Body() course: Partial<Course>): Promise<Course> {
    return this.courseService.updateCourse(id, course);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteCourse(@Param('id') id: number): Promise<void> {
    return this.courseService.deleteCourse(id);
  }
}