import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CourseCategory } from './course-category.entity';
import { Review } from '../../reviews/review.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  instructor: string;

  @Column({ nullable: true })
  materialUrl: string;

  @Column()
  price: number;

  @ManyToMany(() => CourseCategory, category => category.courses)
  @JoinTable()
  categories: CourseCategory[];

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Review, review => review.course)
  reviews: Review[];
}