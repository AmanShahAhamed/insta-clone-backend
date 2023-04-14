import { Module, forwardRef } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import config from "../util/config/env.config";

const JWT_CONF = config().auth;

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UserModule), JwtModule.register(JWT_CONF)],
  exports: [AuthService],
})
export class AuthModule {}
