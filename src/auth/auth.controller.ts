import { Controller, Post, Body, Get,Res,UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Response } from 'express';
import { join } from 'path';
import { AuthGuard } from './jwt-auth.guard';
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

  @Get('login')
  getLoginPage(@Res() res: Response) {
    return res.sendFile(join(__dirname,'..','..', 'public', 'login.html'));
  }
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
