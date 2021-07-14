import { collection, collectionInputDTO } from '../types/collection'
import { CollectionData } from '../data/CollectionData'
import { IdGenerator } from '../services/IdGenerator'
import { Collection } from '../entities/Collection'
import { Authenticator } from '../services/Authenticator';
import { UnauthorizedError } from '../error/UnauthorizedError';

export class CollectionBusiness {
  private token: string | undefined;
  constructor(token?: string) {
    this.token = token
  }
  public async create(input: collectionInputDTO): Promise<Collection> { 
    try {
      const { name } = input;

      if (!name) {
        throw new Error(
          'Missing dependencies: "name'
        );
      }
      const collectionDatabase = new CollectionData();;

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      if (!this.token) {
        throw new UnauthorizedError()
      }

      const authenticator = new Authenticator();
      const author = authenticator.getData(this.token)

      if (!author) {
        throw new UnauthorizedError()
      }

      const collectionForDatabase = new Collection(id, name, author.id);
      const collection = await collectionDatabase.insert(collectionForDatabase);

      if (!collection) {
        throw new Error(
          'internal error registering collection, please try again'
        );
      }

      return collection;

    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }

  public async getById(input: collection): Promise<Collection> {
    try {
      const { id } = input;

      if (!id) {
        throw new Error(
          'Missing dependencies: "id"'
        );
      }
      const userDatabase = new CollectionData();

      const collection = await userDatabase.selectById(id)

      if (!collection) {
        throw new Error(
          'Collection not found'
        );
      }

      return collection;
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }

  public async getByIds(input: string[]): Promise<Collection[]> {
    try {
      const collectionsIds: string[] = input;

      if (!collectionsIds) {
        throw new Error(
          'Missing dependencies: "collections"'
        );
      }

      const collections:Collection[] = []
      
      collectionsIds.forEach(async (id) => {
        const collectionResult = await this.getById({ id: id })
        collections.push(collectionResult)
      })

      return collections;

    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }

  public async getAll(): Promise<Collection[]> {
    try {
      const userDatabase = new CollectionData();

      const collections = await userDatabase.selectAll()

      if (!collections) {
        throw new Error(
          'internal error registering user, please try again'
        );
      }

      return collections;
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
}
