import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/entities/course.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column('text')
  content: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Course, course => course.reviews)
  @JoinColumn()
  course: Course;
}