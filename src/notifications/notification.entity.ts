import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  createdAt: Date;

  @Column()
  read: boolean;

  @ManyToOne(() => User, user => user.notifications)
  @JoinColumn()
  user: User;
}