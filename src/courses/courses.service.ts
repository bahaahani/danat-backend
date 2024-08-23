import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async findAll(query: any): Promise<Course[]> {
    const { search, instructor, ...filters } = query;
    let whereClause: any = { ...filters };

    if (search) {
      whereClause = [
        { ...whereClause, title: Like(`%${search}%`) },
        { ...whereClause, description: Like(`%${search}%`) },
      ];
    }

    if (instructor) {
      whereClause = Array.isArray(whereClause)
        ? whereClause.map(clause => ({ ...clause, instructor }))
        : { ...whereClause, instructor };
    }

    return this.coursesRepository.find({ where: whereClause });
  }

  findOne(id: number): Promise<Course> {
    return this.coursesRepository.findOne({ where: { id } });
  }

  create(course: Partial<Course>): Promise<Course> {
    return this.coursesRepository.save(course);
  }

  async update(id: number, course: Partial<Course>): Promise<Course> {
    await this.coursesRepository.update(id, course);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}