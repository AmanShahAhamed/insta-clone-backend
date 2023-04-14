import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { userController } from "./user.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
  controllers: [userController],
})
export class UserModule {}
