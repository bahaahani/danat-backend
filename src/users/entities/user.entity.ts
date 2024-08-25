import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../../courses/entities/enrollment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string; // Ensure this is not nullable

  @Column()
  role: string;

  @Column()
  status: string; // Ensure this is not nullable

  @OneToMany(() => Enrollment, enrollment => enrollment.user)
  enrollments: Enrollment[];

  @Column({ nullable: true })
  preferences: string; // Ensure this is nullable
}