import { Image } from '../entities/Image'
import { Tag } from '../entities/Tag';
import { CustomError } from '../error/CustomError';
import { BaseData } from './BaseData'

export class ImageTagData extends BaseData {
    private static TABLE_NAME = 'galeria_image_tag';

    public async create(image: Image): Promise<true | false> {
        try {
            const id_image = image.getId()
            const tags = image.getTags()
            if(!id_image){
                throw new CustomError('Image not found', 400);
            }
            if(!tags){
                throw new CustomError('Tag not found', 400);
            }

             tags.forEach(async (tag:Tag) => {
                 await this.getConnection().raw(`
                INSERT INTO ${ImageTagData.TABLE_NAME}
                 (image_id, tag_id) VALUES ('${id_image}', '${tag.getId()}')
                `)
            })

            return true;

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}