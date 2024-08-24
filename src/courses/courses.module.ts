import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';
import { JwtModule } from '@nestjs/jwt'; // Ensure JwtModule is imported

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Enrollment]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    JwtModule.register({
      secret: 'yourSecretKey', // Ensure this matches the secret key used in other modules
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}