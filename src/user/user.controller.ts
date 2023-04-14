import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { EMAIL_REGEX } from "../util/const/constant";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";
import { AuthGuard } from "../common/guard/auth_guard";

@UseGuards(AuthGuard)
@Controller("user")
export class userController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.findOne({});
  }
}
