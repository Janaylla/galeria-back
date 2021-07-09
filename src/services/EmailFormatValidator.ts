import { InvalidFormatError } from '../error/InvalidFormatError';

export class EmailFormatValidator {
  private static EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public validate(email: string) {
    if (!email.match(EmailFormatValidator.EMAIL_REGEX)) {
      throw new InvalidFormatError('invalid email format');
    }
  }
}
