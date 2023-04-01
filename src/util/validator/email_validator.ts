import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EMAIL_REGEX, PHONE_REGEX } from '../const/constant';

@ValidatorConstraint({ name: 'isEmailValid', async: false })
export class IsEmailValidator implements ValidatorConstraintInterface {
  validate(email: string): boolean {
    return EMAIL_REGEX.test(email) || PHONE_REGEX.test(email);
  }
  defaultMessage(): string {
    return 'Invalid Email or Phone Number ';
  }
}
