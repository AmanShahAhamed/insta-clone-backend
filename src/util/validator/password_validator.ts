import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PASSWORD_REGEX } from '../const/constant';

@ValidatorConstraint({ name: 'passwordPolicy', async: false })
export class PasswordPolicyValidator implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    return PASSWORD_REGEX.test(password);
  }

  defaultMessage(): string {
    return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
  }
}
