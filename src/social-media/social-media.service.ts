import { Injectable, HttpServer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class SocialMediaService {
  private twitterClient: TwitterApi;

  constructor(
    private httpService: HttpServer,
    private configService: ConfigService
  ) {
    this.twitterClient = new TwitterApi({
      appKey: this.configService.get<string>('TWITTER_API_KEY'),
      appSecret: this.configService.get<string>('TWITTER_API_SECRET'),
      accessToken: this.configService.get<string>('TWITTER_ACCESS_TOKEN'),
      accessSecret: this.configService.get<string>('TWITTER_ACCESS_SECRET'),
    });
  }

  async shareOnPlatform(platform: string, message: string) {
    switch (platform) {
      case 'twitter':
        return this.shareOnTwitter(message);
      // Add more cases for other platforms as needed
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  private async shareOnTwitter(message: string) {
    return this.twitterClient.v2.tweet(message);
  }
}