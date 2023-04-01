import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async userSignup(userDto: UserDto) {
    try {
      return await this.userService.saveUser(userDto);
    } catch (error) {
      console.log('error', error);
    }
  }

  async userSigning(loginDto: LoginDto) {
    const user = await this.userService.findOne({
      username: loginDto.username,
    });
    if (user) {
      const isCompared: boolean = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (isCompared) return user;
    }
    throw new UnauthorizedException({
      message: 'email or password incorrect',
    });
  }
}
