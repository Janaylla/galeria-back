import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export abstract class BaseData {
  private static connection: Knex | null;

  protected getConnection() {
    
    if (!BaseData.connection) {
      BaseData.connection = knex({
        client: 'mysql',
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        },
      });
    }
    return BaseData.connection;
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseData.connection) {
      await BaseData.connection.destroy();
      BaseData.connection = null;
    }
  }
}
