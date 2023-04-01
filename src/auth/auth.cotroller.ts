import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async userSignup(userDto: UserDto) {}

  @Post('login')
  async userSigning(@Body() body: LoginDto) {
    return await this.authService.userSigning(body);
  }
}
