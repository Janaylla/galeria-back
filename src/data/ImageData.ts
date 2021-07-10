import { Image } from '../entities/Image'
import { CustomError } from '../error/CustomError';
import { BaseData } from './BaseData'

export class ImageData extends BaseData {
    private static TABLE_NAME = 'galeria_image';

    public async create(image: Image): Promise<Image | false> {
        try {
            const author = image.getAuthor()
            const collection = image.getCollection()
            if(!author){
                throw new CustomError('Users not found', 400);
            }
            if(!collection){
                throw new CustomError('Collection not found', 400);
            }

            await this.getConnection().raw(`
            INSERT INTO ${ImageData.TABLE_NAME}
            (id, subtitle, date, file, author_id, collection_id) 
            VALUES ('${image.getId()}',
            '${image.getSubtitle()}',
            '${image.getDate()}', 
            '${image.getFile()}', 
            '${author.getId()}', 
            '${collection.getId()}')
            `)
            console.count("oi")
            const BaseData = await this.getById(image.getId());

            return BaseData;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getById(id: string): Promise<Image | false> {
        try {
            const result = await this.getConnection()
                .select()
                .where({ id: id })
                .into(ImageData.TABLE_NAME);

            if (!result.length || !result[0].subtitle) {
                return false;
            }
            return this.toImageModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    private toImageModel(result: any): Image {
        const {
            id,
            subtitle,
            author,
            date,
            file
        } = result;

        const image = new Image(
            id,
            subtitle,
            author,
            date,
            file
          );
      
          return image;
    }
}