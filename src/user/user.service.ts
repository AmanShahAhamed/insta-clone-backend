import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUsers(query: any): Promise<User[]> {
    try {
      if (!query) return null;
      return await this.userModel.find(query);
    } catch (error) {
      console.log('Error', error);
    }
  }

  async saveUser(userDto: UserDto): Promise<User> {
    try {
      //checking for registered email or phone
      const emailOrPhoneUniqueCondition = userDto.email
        ? { email: userDto.email }
        : { mobileNumber: userDto.mobileNumber };
      const isRegisteredUser = await this.userModel.findOne(
        emailOrPhoneUniqueCondition,
      );
      if (isRegisteredUser)
        throw new ConflictException({
          message:
            'This email or phone already registered please login or click to forget password',
        });

      //checking for unique username
      const isUniqueUsername = await this.userModel.findOne({
        username: userDto.username,
      });
      if (isUniqueUsername)
        throw new ConflictException({
          message: 'username is already registered please try different one',
        });
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userDto.password, salt);
      userDto.password = hashedPassword;
      const user = new this.userModel(userDto);
      return await user.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: error?.response?.message || error,
      });
    }
  }

  async findOne(query: any) {
    if (!query) return null;
    try {
      return await this.userModel.findOne(query);
    } catch (error) {
      console.log('error', error);
    }
  }
}
