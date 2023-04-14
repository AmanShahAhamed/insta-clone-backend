import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./user.dto";
import { User } from "./user.schema";
import stringConstant from "../common/constant/string.constant";
import * as bcrypt from "bcrypt";

type userFindCondition = { email: string } | { mobileNumber: string };

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUsers(query: any): Promise<User[]> {
    if (!query) return null;
    return await this.userModel.find(query);
  }

  async saveUser(userDto: UserDto): Promise<User> {
    const { username, password } = userDto;
    const isUserExist: boolean = await this.checkUserExistence(userDto);
    if (isUserExist)
      throw new ConflictException({
        message: stringConstant().EMAIL_PHONE_EXIST,
      });

    //checking for unique username
    const isUsernameUnique = await this.checkUsernameUnique(username);
    if (!isUsernameUnique)
      throw new ConflictException({
        message: stringConstant().USERNAME_EXIST,
      });

    userDto.password = await this.encryptPassword(password);
    const user = new this.userModel(userDto);
    return await user.save();
  }

  async findOne(query: any) {
    if (!query) return null;
    return await this.userModel.findOne(query);
  }

  private findEmailOrPhoneCondition(userDto: UserDto): userFindCondition {
    const { email, mobileNumber } = userDto;
    return email ? { email } : { mobileNumber };
  }

  private async checkUserExistence(userDto: UserDto): Promise<boolean> {
    const userFindCondition = this.findEmailOrPhoneCondition(userDto);
    const user = await this.userModel.findOne(userFindCondition);
    return user ? true : false;
  }

  private async checkUsernameUnique(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username });
    return user ? false : true;
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
