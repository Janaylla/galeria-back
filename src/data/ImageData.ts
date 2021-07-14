import { Image } from '../entities/Image'
import { User } from '../entities/User';
import { CustomError } from '../error/CustomError';
import { BaseData } from './BaseData'

export class ImageData extends BaseData {
    private static TABLE_NAME = 'galeria_image';

    public async insert(image: Image): Promise<Image | false> {
        try {
            const author = image.getAuthor()
            if (!author) {
                throw new CustomError('Users not found', 400);
            }

            await this.getConnection().raw(`
            INSERT INTO ${ImageData.TABLE_NAME}
            (id, subtitle, date, file, author_id) 
            VALUES ('${image.getId()}',
            '${image.getSubtitle()}',
            '${image.getDate()}', 
            '${image.getFile()}', 
            '${author.getId()}')
            `)
            console.count("oi")
            const BaseData = await this.selectById(image.getId());

            return BaseData;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async deleteById(id: string): Promise<Image | false> {
        try {
            const result = await this.getConnection()
                .raw(`
                SELECT i.id, i.subtitle, i.date, i.file, i.author_id, u.name as author_name, u.nickname as author_nickname
                FROM galeria_image as i
                LEFT JOIN galeria_user as u ON u.id = i.author_id
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
    public async selectById(id: string): Promise<Image | false> {
        try {
            const result = await this.getConnection()
                .raw(`
                SELECT i.id, i.subtitle, i.date, i.file, i.author_id, u.name as author_name, u.nickname as author_nickname
                FROM galeria_image as i
                LEFT JOIN galeria_user as u ON u.id = i.author_id
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
    public async selectAll(id: string): Promise<Image[] | false> {
        try {
            const result = await this.getConnection()
                .raw(`
                SELECT i.id, i.subtitle, i.date, i.file, i.author_id,
                 u.name as author_name, u.nickname as author_nickname
                FROM galeria_image as i
                LEFT JOIN galeria_user as u ON u.id = i.author_id
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
            author_id,
            author_name,
            author_nickname
        } = result[0];


        const author = new User(author_id, author_name, author_nickname)

        const image = new Image(
            id,
            subtitle,
            file,
            date,
            author,
            [],
            [],
        );

        return image;
    }

    private toImagesModel(result: any): Image[] {
        return result.map((item: any) => {
            const {
                id,
                subtitle,
                date,
                file,
                author_id,
                author_name,
                author_nickname
            } = item;

            const author = new User(author_id, author_name, author_nickname)

            const image = new Image(
                id,
                subtitle,
                file,
                date,
                author
            );
            return image
        })

    }
}