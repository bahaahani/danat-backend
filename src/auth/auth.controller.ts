import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ access_token: string }> {
    const user = await this.authService.register(registerDto);
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.authService.generateAccessToken(payload);
    return { access_token: accessToken };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{ access_token: string }> {
    const payload = { email: req.user.email, sub: req.user.id, role: req.user.role };
    const accessToken = this.authService.generateAccessToken(payload);
    return { access_token: accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    return req.user;
  }
}