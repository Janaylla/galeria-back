import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { BaseData } from '../data/BaseData';

export class UserController {
  public async signup(request: Request, response: Response) {
    try {
      const { name, nickname, email, password } = request.body;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.signup({
        name,
        nickname,
        email,
        password,
      });

      response.json({ message: 'Success', token });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async login(request: Request, response: Response) {
    try {
      const { login, password } = request.body;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.login({
        login,
        password
      });

      response.json({ message: 'Success', token });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
}
