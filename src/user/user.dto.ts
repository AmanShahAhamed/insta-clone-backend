import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { phoneFormatter } from '../util/phone_formatter';
import { IsEmailValidator } from '../util/validator/email_validator';
import { PasswordPolicyValidator } from '../util/validator/password_validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsEmailValidator)
  @Transform(phoneFormatter)
  signup: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @Validate(PasswordPolicyValidator)
  password: string;

  email: string;
  mobileNumber: string;
}
