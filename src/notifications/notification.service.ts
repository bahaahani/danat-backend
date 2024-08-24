import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getNotifications(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { user: { id: userId } } });
  }

  async createNotification(notification: Partial<Notification>): Promise<Notification> {
    const user = await this.userRepository.findOne({ where: { id: notification.user.id } });
    return this.notificationRepository.save({ ...notification, user, createdAt: new Date() });
  }

  async markNotificationAsRead(notificationId: number, userId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, user: { id: userId } },
    });
    if (notification) {
      notification.read = true;
      return this.notificationRepository.save(notification);
    } else {
      throw new Error('Notification not found or not owned by the current user');
    }
  }

  async deleteNotification(notificationId: number, userId: number): Promise<void> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, user: { id: userId } },
    });
    if (notification) {
      await this.notificationRepository.delete(notificationId);
    } else {
      throw new Error('Notification not found or not owned by the current user');
    }
  }
}