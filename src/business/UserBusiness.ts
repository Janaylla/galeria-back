import { userInputDTO, userCredentials } from '../types/user'
import { UserData } from '../data/UserData'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { User } from '../entities/User'
import { Authenticator } from '../services/Authenticator'

export class UserBusiness {
  public async signup(input: userInputDTO): Promise<string> {
    try {
      const { name, nickname, email, password } = input;

      if (!name || !nickname || !email || !password) {
        throw new Error(
          'Missing dependencies: "name" or "nickname" or "email" or "password"'
        );
      }
      const userDatabase = new UserData();;

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(password);

      const userForDatabase = new User(id, name, nickname, email, hashPassword);
      const user = await userDatabase.insert(userForDatabase);

      if (!user) {
        throw new Error(
          'internal error registering user, please try again'
        );
      }

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.getId(),
      });

      return token;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
  public async login(input: userCredentials): Promise<string> {
    try {
      const { login, password } = input;

      if (!login) {
        throw new Error(
          'Missing dependencies: "login"'
        );
      }
      const userDatabase = new UserData();

      const user = login.includes('@') ? await userDatabase.selectByEmail(login) : await userDatabase.selectByNickname(login)

      const hashManager = new HashManager();

      if (!user) {
        throw new Error(
          'internal error registering user, please try again'
        );
      }
      const passwordIsEqual = await hashManager.compare(password, user.getPassword())

      if(!passwordIsEqual){
        throw new Error(
          'Password incorrect'
        );
      }
      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.getId(),
      });

      return token;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
}
