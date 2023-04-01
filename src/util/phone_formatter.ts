import { EMAIL_REGEX } from './const/constant';

export function phoneFormatter(email: any) {
  //12345
  let value = email.value;
  if (!EMAIL_REGEX.test(value)) {
    value =
      value.substring(0, 3) +
      '-' +
      value.substring(3, 6) +
      '-' +
      value.substring(6);
  }
  return value;
}
