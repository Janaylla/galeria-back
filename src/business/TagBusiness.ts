import { tag, tagInputDTO, tagsIds } from '../types/tag'
import { TagData } from '../data/TagData'
import { IdGenerator } from '../services/IdGenerator'
import { Tag } from '../entities/Tag'

export class TagBusiness {
  public async create(input: tagInputDTO): Promise<Tag> {
    try {
      const { name } = input;

      if (!name) {
        throw new Error(
          'Missing dependencies: "name'
        );
      }
      const tagDatabase = new TagData();;

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      const tagForDatabase = new Tag(id, name);
      const tag = await tagDatabase.create(tagForDatabase);

      if (!tag) {
        throw new Error(
          'internal error registering tag, please try again'
        );
      }

      return tag;

    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }

  public async getById(input: tag): Promise<Tag> {
    try {
      const { id } = input;

      if (!id) {
        throw new Error(
          'Missing dependencies: "login"'
        );
      }
      const userDatabase = new TagData();

      const tag = await userDatabase.getById(id)

      if (!tag) {
        throw new Error(
          'internal error registering user, please try again'
        );
      }

      return tag;
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }

  public async getByIds(input: tagsIds): Promise<Tag[]> {
    try {
      const tagsIds: tagsIds = input;

      if (!tagsIds) {
        throw new Error(
          'Missing dependencies: "tags"'
        );
      }

      const tags = tagsIds.map(async (tag) => {
        const tagResult = await this.getById({ id: tag.id })
        return tagResult
      })

      if(tags){
        throw new Error(
          'Tag not found'
        );
      }

      return tags;

    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }

  public async getAll(): Promise<Tag[]> {
    try {
      const userDatabase = new TagData();

      const tags = await userDatabase.getAll()

      if (!tags) {
        throw new Error(
          'internal error registering user, please try again'
        );
      }

      return tags;
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
}
