import { imageInputDTO } from '../types/image'
import { ImageData } from '../data/ImageData'
import { IdGenerator } from '../services/IdGenerator'
import { Image } from '../entities/Image'
import { Authenticator } from '../services/Authenticator'
import { UnauthorizedError } from '../error/UnauthorizedError'
import { CustomError } from '../error/CustomError'
import {CollectionBusiness} from './CollectionBusiness'
import { TagBusiness } from './TagBusiness'
import { UserData } from '../data/UserData'
import { ImageTagData } from '../data/ImageTagsData'
import { DataConvert } from '../services/DataConvert'
import { ImageCollectionData } from '../data/ImageCollectionData'

export class ImageBusiness {
  private token: string | undefined;
  constructor(token?: string) {
    this.token = token
  }
  public async create(input: imageInputDTO): Promise<Image> {
    try {
      const { subtitle,  file, tags, collections } = input;

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
      const authorClass = await userData.getById(author.id)

      if(!authorClass){
        throw new UnauthorizedError();
      }
      const imageForDatabase = new Image(id, subtitle, file, date.getDateToMySql(), authorClass, tagsClass, collectionsClass);
  
      const image = await imageDatabase.create(imageForDatabase);
      await imageTagDatabase.create(imageForDatabase)
      console.log("imageForDatabase", imageForDatabase)

      await imageCollectionDatabase.create(imageForDatabase)

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
  public async getById(id:string): Promise<Image> {
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

      const image = await imageDatabase.getById(id)
      if (!image) {
        throw new Error(
          'Image not found'
        );
      }
      const author = image.getAuthor()
      if(!author || author.getId() != user.id){
        throw new UnauthorizedError()
      }
      image.setTags(await imageTagDatabase.getByImage(id) || [])
      image.setCollections(await imageCollectionDatabase.getByImage(id) || [])
      return image;
      
    } catch (error) {
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

      const image = await imageDatabase.getAll(user.id);

      if(!image){
        throw new CustomError("images not founds", 400)
      }
      return image;
        
    } catch (error) {
      throw new Error(error.sqlMessage || error.message || 500);
    }
  }
}
