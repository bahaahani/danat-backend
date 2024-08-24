import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get()
  findAll(@Query() query): Promise<Course[]> {
    return this.coursesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(+id);
  }

  @Post()
  @Roles('admin')
  create(@Body() course: Partial<Course>): Promise<Course> {
    return this.coursesService.create(course);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() course: Partial<Course>): Promise<Course> {
    return this.coursesService.update(+id, course);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(+id);
  }

  @Post('upload/:id')
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async uploadFile(@Param('id') id: string, @UploadedFile() file) {
    const materialUrl = `uploads/${file.filename}`;
    return this.coursesService.update(+id, { materialUrl });
  }
}