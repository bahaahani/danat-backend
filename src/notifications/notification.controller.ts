import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotifications(@Request() req): Promise<Notification[]> {
    return this.notificationService.getNotifications(req.user.id);
  }

  @Post()
  async createNotification(@Body() notification: Partial<Notification>): Promise<Notification> {
    return this.notificationService.createNotification(notification);
  }

  @Put(':notificationId/read')
  async markNotificationAsRead(@Param('notificationId') notificationId: number, @Request() req): Promise<Notification> {
    return this.notificationService.markNotificationAsRead(notificationId, req.user.id);
  }

  @Delete(':notificationId')
  async deleteNotification(@Param('notificationId') notificationId: number, @Request() req): Promise<void> {
    return this.notificationService.deleteNotification(notificationId, req.user.id);
  }
}