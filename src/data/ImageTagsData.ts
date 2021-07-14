import { Image } from '../entities/Image'
import { Tag } from '../entities/Tag';
import { CustomError } from '../error/CustomError';
import { BaseData } from './BaseData'

export class ImageTagData extends BaseData {
    private static TABLE_NAME = 'galeria_image_tag';

    public async create(image: Image): Promise<true | false> {
        try {
            const image_id = image.getId()
            const tags = image.getTags()
            if(!image_id){
                throw new CustomError('Image not found', 400);
            }
            if(!tags){
                throw new CustomError('Tag not found', 400);
            }

             tags.forEach(async (tag:Tag) => {
                 await this.getConnection().raw(`
                INSERT INTO ${ImageTagData.TABLE_NAME}
                 (image_id, tag_id) VALUES ('${image_id}', '${tag.getId()}')
                `)
            })

            return true;

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getByImage(image_id: string): Promise<Tag[] | false>{
     
        const result = await this.getConnection().raw(`
            SELECT * FROM galeria_tag as t
            JOIN galeria_image_tag as it ON it.tag_id = t.id
            WHERE it.image_id LIKE '${image_id}';
        `)
        return this.toTagsModel(result[0]);
    } 
    private toTagsModel(result: any): Tag[] {
        const tags = result.map((tagResult: any) => {
            const {
                id,
                name
            } = tagResult;

            const tag = new Tag(
                id,
                name
            );
            return tag
        })

        return tags;
    }
}