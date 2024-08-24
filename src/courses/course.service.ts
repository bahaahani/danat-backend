import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseCategory } from './entities/course-category.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseCategory)
    private courseCategoryRepository: Repository<CourseCategory>,
  ) {}

  async getCourses(query: {
    search?: string;
    category?: number;
    instructor?: string;
  }): Promise<Course[]> {
    const { search, category, instructor } = query;
    let where: any = {};

    if (search) {
      where = [
        { title: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
      ];
    }

    if (category) {
      const courseCategory = await this.courseCategoryRepository.findOne({ where: { id: category } });
      where = { categories: [courseCategory] };
    }

    if (instructor) {
      where = { ...where, instructor };
    }

    return this.courseRepository.find({ where, relations: ['categories', 'enrollments', 'reviews'] });
  }

  async getCourseById(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id }, relations: ['categories', 'enrollments', 'reviews'] });
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const categories = await this.getOrCreateCategories(course.categories);
    return this.courseRepository.save({ ...course, categories });
  }

  async updateCourse(id: number, course: Partial<Course>): Promise<Course> {
    const existingCourse = await this.getCourseById(id);
    const categories = await this.getOrCreateCategories(course.categories);
    await this.courseRepository.update(id, { ...course, categories });
    return this.getCourseById(id);
  }

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }

  private async getOrCreateCategories(categories: { id: number; name: string }[]): Promise<CourseCategory[]> {
    const existingCategories = await this.courseCategoryRepository.findByIds(categories.map(c => c.id));
    const newCategories = categories.filter(c => !existingCategories.find(ec => ec.id === c.id));
    const savedNewCategories = await this.courseCategoryRepository.save(newCategories);
    return [...existingCategories, ...savedNewCategories];
  }
}