import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
    @IsNotEmpty()
    role: string; // Make role required

    @IsString()
    @IsNotEmpty()
    preferences?: string; // Make emailPreferences required
}