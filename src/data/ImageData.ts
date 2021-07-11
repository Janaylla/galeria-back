import { Collection } from '../entities/Collection';
import { Image } from '../entities/Image'
import { Tag } from '../entities/Tag';
import { User } from '../entities/User';
import { CustomError } from '../error/CustomError';
import { IdGenerator } from '../services/IdGenerator';
import { BaseData } from './BaseData'

export class ImageData extends BaseData {
    private static TABLE_NAME = 'galeria_image';

    public async create(image: Image): Promise<Image | false> {
        try {
            const author = image.getAuthor()
            const collection = image.getCollection()
            if (!author) {
                throw new CustomError('Users not found', 400);
            }
            if (!collection) {
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
                .raw(`
                SELECT i.id, i.subtitle, i.date, i.author_id, i.file,
                u.name as author_name, i.collection_id,
                c.name as collection_name,
                c.author_id as collection_author_id,
                t.id as tag_id, t.name as tag_name
                FROM galeria_image as i
                LEFT JOIN galeria_user as u ON u.id = i.author_id
                LEFT JOIN galeria_collection as c ON i.collection_id = c.id
                LEFT JOIN galeria_image_tag as it ON it.id_image = i.id
                LEFT JOIN galeria_tag as t ON t.id = it.id_tag
                WHERE i.id = '${id}'
                `)

            if (!result[0].length || !result[0][0].subtitle) {
                return false;
            }
            return this.toImageModel(result[0], true);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getAll(id: string): Promise<Image[] | false> {
        try {
            const result = await this.getConnection()
                .raw(`
                SELECT i.id, i.subtitle, i.date, i.file,
                i.author_id, u.name as author_name, i.collection_id,
                 c.name as collection_name,
                 c.author_id as collection_author_id
                FROM galeria_image as i
                LEFT JOIN galeria_user as u ON u.id = i.author_id
                LEFT JOIN galeria_collection as c ON i.collection_id = c.id
                WHERE i.author_id = '${id}'
                `)

            if (!result[0].length) {
                return false;
            }
            return this.toImagesModel(result[0])

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    private toImageModel(result: any, completed?: boolean): Image {
        const {
            id,
            subtitle,
            date,
            file,
            tag_id,
            collection_id,
            collection_name,
            collection_author_id,
            author_id,
            author_name
        } = result[0];

        if (completed) {
            const tags = tag_id ? (result.map((item: any) => {
                return new Tag(item.tag_id, item.tag_name)
            })) : []

            const collection = new Collection(collection_id, collection_name, collection_author_id)
            const author = new User(author_id, author_name)

            const image = new Image(
                id,
                subtitle,
                file,
                date,
                tags,
                collection,
                author
            );
    
            return image;

        }
        const image = new Image(
            id,
            subtitle,
            file,
            date
        );

        return image;
    }
    
    private toImagesModel(result: any): Image[] {
        return result.map((item: any) => {
            const {
                id,
                subtitle,
                date,
                file
            } = item;
    
            const image = new Image(
                id,
                subtitle,
                file,
                date
            );
            return image
        })

    }
}