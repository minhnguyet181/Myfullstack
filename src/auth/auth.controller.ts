import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsEmail } from 'class-validator';

// DTO cho đăng nhập
class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API đăng nhập
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
