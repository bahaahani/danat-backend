import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Course } from './course.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enrollmentDate: Date;

  @Column()
  status: string;

  @Column()
  progress: number;

  @ManyToOne(() => User, user => user.enrollments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Course, course => course.enrollments)
  @JoinColumn()
  course: Course;
}