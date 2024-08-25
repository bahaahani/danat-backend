import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty() // Ensure name is not empty
    @IsString()
    name: string;

    @IsString()
    role?: string; // Make role optional

    @IsOptional()
    @IsString()
    preferences?: string; // Make emailPreferences optional
}