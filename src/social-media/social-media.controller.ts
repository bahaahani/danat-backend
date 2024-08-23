import { Controller, Post, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('social-media')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post('share')
  @Roles('admin')
  async shareOnPlatform(@Body() sharePostDto: SharePostDto) {
    try {
      return await this.socialMediaService.shareOnPlatform(sharePostDto.platform, sharePostDto.message);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}