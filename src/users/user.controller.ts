import { Body, Controller, Get, Param, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service'; // Ensure the correct import
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) { } // Ensure UsersService is injected here

  @Get('profile')
  async getProfile(@Request() req): Promise<User> {
    return this.usersService.findById(req.user.id); // Ensure correct method name
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updateData: Partial<User>): Promise<User> {
    return this.usersService.update(req.user.id, updateData); // Ensure correct method name
  }

  @Put('change-password')
  async changePassword(@Request() req, @Body() { oldPassword, newPassword }: { oldPassword: string; newPassword: string }): Promise<User> {
    return this.usersService.changePassword(req.user.id, oldPassword, newPassword); // Ensure correct method name
  }

  @Put('email-preferences')
  async updateEmailPreferences(@Request() req, @Body() preferences: string): Promise<User> {
    return this.usersService.updateEmailPreferences(req.user.id, preferences); // Ensure correct method name
  }

  @Get('course-history')
  async getCourseHistory(@Request() req): Promise<any[]> {
    return this.usersService.getCourseHistory(req.user.id); // Ensure correct method name
  }
}