import { InvalidFormatError } from '../error/InvalidFormatError';

export class PasswordFormatValidator {
  private static PASSWORD_MIN_SIZE = 6;

  public validate(password: string) {
    if (!this.validLength(password)) {
      throw new InvalidFormatError('password must be at least 6 characters');
    }

    return true;
  }

  private validLength(password: string): boolean {
    return password.length >= PasswordFormatValidator.PASSWORD_MIN_SIZE;
  }
}
