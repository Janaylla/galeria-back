import { v4, validate } from 'uuid';

export class IdGenerator {
  generate(): string {
    return v4();
  }

  isValid(id: string): boolean {
    return validate(id);
  }
}
