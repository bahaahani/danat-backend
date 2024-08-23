import { IsString, IsNotEmpty } from 'class-validator';

export class SharePostDto {
  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}