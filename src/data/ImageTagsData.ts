import { Image } from '../entities/Image'
import { Tag } from '../entities/Tag';
import { CustomError } from '../error/CustomError';
import { BaseData } from './BaseData'

export class ImageTagData extends BaseData {
    private static TABLE_NAME = 'galeria_image_tag';

    public async inserts(image: Image): Promise<true | false> {
        try {
            const image_id = image.getId()
            const tags = image.getTags()
            if (!image_id) {
                throw new CustomError('Image not found', 400);
            }
            if (!tags) {
                throw new CustomError('Tag not found', 400);
            }

            tags.forEach(async (tag: Tag) => {
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
    public async insert(image_id: string, tag_id: string): Promise<true | false> {
        try {
            const result = await this.getConnection().raw(`
                INSERT INTO ${ImageTagData.TABLE_NAME}
                 (image_id, tag_id) VALUES ('${image_id}', '${tag_id}')
                `)

            return (result[0].affectedRows === true)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async selectByImage(image_id: string): Promise<Tag[] | false> {
        const result = await this.getConnection().raw(`
            SELECT * FROM galeria_tag as t
            JOIN galeria_image_tag as it ON it.tag_id = t.id
            WHERE it.image_id LIKE '${image_id}';
        `)
        return this.toTagsModel(result[0]);
    }
    public async delByImageAndTag(image_id: string, tag_id: string): Promise<boolean> {
        const result = await this.getConnection().raw(`
            DELETE FROM ${ImageTagData.TABLE_NAME}
            WHERE tag_id = '${tag_id}' and 
            image_id = '${image_id}';
        `)
        return (result[0].affectedRows === true)
    }
    public async delByImage(image_id: string): Promise<boolean> {
        const result = await this.getConnection().raw(`
            DELETE FROM ${ImageTagData.TABLE_NAME}
            WHERE image_id = '${image_id}';
        `)
        return (result[0].affectedRows === true)
    }
    public async delByTag(tag_id: string): Promise<boolean> {
        const result = await this.getConnection().raw(`
            DELETE FROM ${ImageTagData.TABLE_NAME}
            WHERE tag_id = '${tag_id}';
        `)
        return (result[0].affectedRows === true)
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