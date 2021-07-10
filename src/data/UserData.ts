import { User } from '../entities/User'
import { BaseData } from './BaseData'

export class UserData extends BaseData {
    private static TABLE_NAME = 'galeria_user';

    public async create(user: User): Promise<User | false> {
        try {
            await this.getConnection().insert(user).into(UserData.TABLE_NAME);

            const BaseData = await this.getById(user.getId());

            return BaseData;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getById(id: string): Promise<User | false> {
        try {
            const result = await this.getConnection()
                .select()
                .where({ id: id })
                .into(UserData.TABLE_NAME);

            if (!result.length || !result[0].name) {
                return false;
            }
            return this.toUserModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getByEmail(email: string): Promise<User | false> {
        try {
            const result = await this.getConnection()
                .select()
                .where({ email: email })
                .into(UserData.TABLE_NAME);

            if (!result.length || !result[0].name) {
                return false;
            }
            return this.toUserModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getByNickname(nickname: string): Promise<User | false> {
        try {
            const result = await this.getConnection()
                .select()
                .where({ nickname: nickname })
                .into(UserData.TABLE_NAME);

            if (!result.length || !result[0].name) {
                return false;
            }
            return this.toUserModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    private toUserModel(result: any): User {
        const {
            id,
            name,
            nickname,
            email,
            password
        } = result;

        const user = new User(
            id,
            name,
            nickname,
            email,
            password
          );
      
          return user;
    }
}