import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/entities/course.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  paymentMethod: string;

  @Column()
  paymentStatus: string;

  @Column()
  paymentDate: Date;

  @ManyToOne(() => User, user => user.payments)
  @JoinColumn()
  user: User;

  // @ManyToOne(() => Course, course => course.payments)
  @JoinColumn()
  course: Course;
}