import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "../user/user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { EMAIL_REGEX } from "../util/const/constant";
import { UserService } from "../user/user.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post("signup")
  async userSignup(@Body() userDto: UserDto) {
    if (EMAIL_REGEX.test(userDto.signup)) userDto.email = userDto.signup;
    else userDto.mobileNumber = userDto.signup;
    return await this.userService.saveUser(userDto);
  }

  @Post("login")
  async userLogin(@Body() body: LoginDto) {
    return await this.authService.userLogin(body);
  }
}
