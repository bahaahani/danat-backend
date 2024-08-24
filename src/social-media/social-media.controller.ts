import { Controller, Post, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { SharePostDto } from './dto/share-post.dto';

@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) { }

  @Post('share')
  async shareOnPlatform(@Body() sharePostDto: SharePostDto) {
    try {
      return await this.socialMediaService.shareOnPlatform(sharePostDto.platform, sharePostDto.message);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}