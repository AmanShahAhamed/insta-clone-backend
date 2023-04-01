import { Body, Controller, Get, Post } from '@nestjs/common';
import { EMAIL_REGEX } from '../util/const/constant';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async saveUser(@Body() body: UserDto) {
    if (EMAIL_REGEX.test(body.signup)) body.email = body.signup;
    else body.mobileNumber = body.signup;
    return await this.userService.saveUser(body);
  }
}
