import * as jwt from 'jsonwebtoken'
import { AuthenticationData } from '../types/user'

export class Authenticator {
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = '2 days'
  ): string {
    const token = jwt.sign(
      {
        id: input.id
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: data.id
    };
    return result;
  }
}
