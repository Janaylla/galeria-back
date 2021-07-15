import { ImageCollectionInputDTO, imageDelInputDTO, imageInputDTO, ImageTagInputDTO } from '../types/image'
import { ImageData } from '../data/ImageData'
import { IdGenerator } from '../services/IdGenerator'
import { Image } from '../entities/Image'
import { Authenticator } from '../services/Authenticator'
import { UnauthorizedError } from '../error/UnauthorizedError'
import { CustomError } from '../error/CustomError'
import { CollectionBusiness } from './CollectionBusiness'
import { TagBusiness } from './TagBusiness'
import { UserData } from '../data/UserData'
import { ImageTagData } from '../data/ImageTagsData'
import { DataConvert } from '../services/DataConvert'
import { ImageCollectionData } from '../data/ImageCollectionData'
import { TagData } from '../data/TagData'
import { CollectionData } from '../data/CollectionData'

export class ImageBusiness {
  private token: string | undefined;
  constructor(token?: string) {
    this.token = token
  }
  public async create(input: imageInputDTO): Promise<Image> {
    try {
      const { subtitle, file, tags, collections } = input;

      if (!subtitle || !tags || !collections || !file) {
        throw new CustomError(
          'Missing dependencies', 400
        );
      }
      const imageDatabase = new ImageData();
      const imageTagDatabase = new ImageTagData();
      const imageCollectionDatabase = new ImageCollectionData()

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      if (!this.token) {
        throw new UnauthorizedError()
      }

      const authenticator = new Authenticator();
      const author = authenticator.getData(this.token);

      if (!author) {
        throw new UnauthorizedError()
      }
      const date = new DataConvert(new Date())

      const collectionsBusiness = new CollectionBusiness(this.token)
      const collectionsClass = await collectionsBusiness.getByIds(collections)

      const tagBusiness = new TagBusiness()
      const tagsClass = await tagBusiness.getByIds(tags)

      const userData = new UserData()
      const authorClass = await userData.selectById(author.id)

      if (!authorClass) {
        throw new UnauthorizedError();
      }
      const imageForDatabase = new Image(id, subtitle, file, date.getDateToMySql(), authorClass, tagsClass, collectionsClass);

      const image = await imageDatabase.insert(imageForDatabase);
      await imageTagDatabase.inserts(imageForDatabase)
      await imageCollectionDatabase.inserts(imageForDatabase)

      if (!image) {
        throw new Error(
          'Internal error registering image, please try again'
        );
      }

      return image;

    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
  public async getById(id: string): Promise<Image> {
    try {
      if (!this.token) {
        throw new UnauthorizedError()
      }
      if (!id) {
        throw new Error(
          'Missing dependencies: "id"'
        );
      }
      const imageDatabase = new ImageData();
      const imageTagDatabase = new ImageTagData();
      const imageCollectionDatabase = new ImageCollectionData()

      const authenticator = new Authenticator();
      const user = authenticator.getData(this.token);

      const image = await imageDatabase.selectById(id)

      if (!image) {
        throw new Error(
          'Image not found'
        );
      }
      const author = image.getAuthor()
      if (!author || author.getId() != user.id) {
        throw new UnauthorizedError()
      }
      image.setTags(await imageTagDatabase.selectByImage(id) || [])
      image.setCollections(await imageCollectionDatabase.selectByImage(id) || [])
      return image;

    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
  public async del(input: imageDelInputDTO): Promise<void> {
    try {
      const { id } = input
      console.log("input", input)
      const imageDatabase = new ImageData();
      const imageTagDatabase = new ImageTagData();
      const imageCollectionDatabase = new ImageCollectionData();
     
      if (!this.token) {
        throw new UnauthorizedError()
      }
      if (!id) {
        throw new CustomError(
          'Missing dependencies', 400
        );
      }
      
      const image = await imageDatabase.selectById(id)

      if (!image) {
        throw new CustomError(
          'Image not found, check dependencies', 404
        );
      }
      const authenticator = new Authenticator();
      const user = authenticator.getData(this.token);
      
      const author = image.getAuthor()
      if (!author || author.getId() != user.id) {
        throw new UnauthorizedError()
      }
      await imageTagDatabase.delByImage(image.getId())
      await imageCollectionDatabase.delByImage(image.getId())
      const result = await imageDatabase.delById(image.getId())

      if(!result) {
        throw new CustomError("Internal Server Error", 500 )
      }
    }
    catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
  public async getAll(): Promise<Image[]> {
    try {
      if (!this.token) {
        throw new UnauthorizedError()
      }

      const imageDatabase = new ImageData();

      const authenticator = new Authenticator();

      const user = authenticator.getData(this.token);

      const image = await imageDatabase.selectAll(user.id);

      if (!image) {
        throw new CustomError("images not founds", 400)
      }
      return image;

    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
  public async delImageTag(input: ImageTagInputDTO): Promise<void> {
    try {
      const { image_id, tag_id } = input
      
      const imageDatabase = new ImageData();
      const tagDatabase = new TagData()

      if (!image_id || !tag_id) {
        throw new CustomError(
          'Missing dependencies', 400
        );
      }
      
      const image = await imageDatabase.selectById(image_id)
      const tag = await tagDatabase.selectById(tag_id)
      if (!image || !tag) {
        throw new CustomError(
          'Image or tag not found, check dependencies', 404
        );
      }
      const imageTagDatabase = new ImageTagData();
      const result = await imageTagDatabase.delByImageAndTag(image.getId(), tag.getId())

      console.log("result", result)
      if(!result) {
        throw new CustomError("Internal Server Error", 500 )
      }
    }
    catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
  public async addImageTag(input: ImageTagInputDTO): Promise<void> {
    try {
      const { image_id, tag_id } = input

      const imageDatabase = new ImageData();
      const tagDatabase = new TagData()

      if (!image_id || !tag_id) {
        throw new CustomError(
          'Missing dependencies', 400
        );
      }
      
      const image = await imageDatabase.selectById(image_id)
      const tag = await tagDatabase.selectById(tag_id)
      if (!image || !tag) {
        throw new CustomError(
          'Image or tag not found, check dependencies', 404
        );
      }
      const imageTagDatabase = new ImageTagData();
      const result = await imageTagDatabase.insert(image.getId(), tag.getId())
      
      if(!result) {
        throw new CustomError("Internal Server Error", 500 )
      }
    }
    catch (error) {
      throw new Error(error.message || 500);
    }
  }
  
  public async delImageCollection(input: ImageCollectionInputDTO): Promise<void> {
    try {
      const { collection_id, image_id } = input
      console.log("input", input)
      const imageDatabase = new ImageData();
      const collectionDatabase = new CollectionData()

      if (!collection_id || !image_id) {
        throw new CustomError(
          'Missing dependencies', 400
        );
      }
      
      const image = await imageDatabase.selectById(image_id)
      const collection = await collectionDatabase.selectById(collection_id)
      if (!image || !collection) {
        throw new CustomError(
          'Image or collection not found, check dependencies', 404
        );
      }
      const imageTagDatabase = new ImageCollectionData();
      const result = await imageTagDatabase.delByImageAndCollection(image.getId(), collection.getId())

      console.log("result", result)
      if(!result) {
        throw new CustomError("Internal Server Error", 500 )
      }
    }
    catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
  public async addImageCollection(input: ImageCollectionInputDTO): Promise<void> {
    try {
      const { image_id, collection_id } = input

      const imageDatabase = new ImageData();
      const collectionDatabase = new CollectionData()

      if (!image_id || !collection_id) {
        throw new CustomError(
          'Missing dependencies', 400
        );
      }
      
      const image = await imageDatabase.selectById(image_id)
      const collection = await collectionDatabase.selectById(collection_id)
      if (!image || !collection) {
        throw new CustomError(
          'Image or tag not found, check dependencies', 404
        );
      }
      const imageCollectionDatabase = new ImageCollectionData()
      const result = await imageCollectionDatabase.insert(image.getId(), collection.getId())
      
      if(!result) {
        throw new CustomError("Internal Server Error", 500 )
      }
    }
    catch (error) {
      throw new Error(error.message || 500);
    }
  }
}
