import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../user/user.schema";
import stringConst from "../common/constant/string.constant";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async userSignup(userDto: UserDto): Promise<User> {
    return await this.userService.saveUser(userDto);
  }

  async userLogin(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findOne({ username });
    if (user) {
      const isPasswordMatch: boolean = await bcrypt.compare(
        password,
        user.password
      );
      if (isPasswordMatch) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    throw new UnauthorizedException({
      message: stringConst().EMAIL_PASSWORD_INCORRECT,
    });
  }
}
