import { Module, HttpModule } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';

@Module({
  imports: [HttpModule],
  providers: [SocialMediaService],
  controllers: [SocialMediaController],
  exports: [SocialMediaService],
})
export class SocialMediaModule {}