import { Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async signIn(email: string, pass: string): Promise<any> {
  
    const user = await this.usersService.findOneByEmail(email);
    
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    

    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  
}
