import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  role: string; // Make role required

  @IsString()
  status: string; // Make status required

  @IsOptional()
  @IsString()
  preferences?: string; // Make emailPreferences optional
}