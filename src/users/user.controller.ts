import { Body, Controller, Get, Param, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  async getProfile(@Request() req): Promise<User> {
    return this.userService.findOne(req.user.id);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updateData: Partial<User>): Promise<User> {
    return this.userService.update(req.user.id, updateData);
  }

  @Put('change-password')
  async changePassword(@Request() req, @Body() { oldPassword, newPassword }: { oldPassword: string; newPassword: string }): Promise<User> {
    return this.userService.changePassword(req.user.id, oldPassword, newPassword);
  }

  @Put('email-preferences')
  async updateEmailPreferences(@Request() req, @Body() preferences: string): Promise<User> {
    return this.userService.updateEmailPreferences(req.user.id, preferences);
  }

  @Get('course-history')
  async getCourseHistory(@Request() req): Promise<any[]> {
    return this.userService.getCourseHistory(req.user.id);
  }
}