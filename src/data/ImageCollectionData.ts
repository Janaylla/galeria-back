import { Image } from '../entities/Image'
import { Collection, CollectionMoreDetails } from '../entities/Collection';
import { CustomError } from '../error/CustomError';
import { BaseData } from './BaseData'
import { User } from '../entities/User';

export class ImageCollectionData extends BaseData {
    private static TABLE_NAME = 'galeria_image_collection';

    public async inserts(image: Image): Promise<true | false> {
        try {
            const image_id = image.getId()
            const collections = image.getCollections()
            if (!image_id) {
                throw new CustomError('Image not found', 400);
            }
            if (!collections) {
                throw new CustomError('Collection not found', 400);
            }
            console.log("collections", collections)
            collections.forEach(async (collection: Collection) => {
                await this.getConnection().raw(`
                INSERT INTO ${ImageCollectionData.TABLE_NAME}
                 (image_id, collection_id) VALUES ('${image_id}', '${collection.getId()}')
                `)
            })

            return true;

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async insert(image_id: string, collection_id: string): Promise<true | false> {
        try {
            const result = await this.getConnection().raw(`
                INSERT INTO ${ImageCollectionData.TABLE_NAME}
                 (image_id, collection_id) VALUES ('${image_id}', '${collection_id}')`)

            return (result[0].affectedRows == true)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async delByImageAndCollection(image_id: string, collection_id: string): Promise<boolean> {
        try {
        const result = await this.getConnection().raw(`
            DELETE FROM ${ImageCollectionData.TABLE_NAME}
            WHERE collection_id = '${collection_id}' and 
            image_id = '${image_id}'
        `)
             return (result[0].affectedRows == true)
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async delByImage(image_id: string): Promise<boolean> {
        try{
        const result = await this.getConnection().raw(`
            DELETE FROM ${ImageCollectionData.TABLE_NAME}
            WHERE image_id = '${image_id}';
        `)
        return (result[0].affectedRows == true)
        }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async delByCollection(collection_id: string): Promise<boolean> {
        const result = await this.getConnection().raw(`
            DELETE FROM ${ImageCollectionData.TABLE_NAME}
            WHERE collection_id = '${collection_id}';
        `)
        return (result[0].affectedRows == true)
    }

    public async selectByImage(image_id: string): Promise<Collection[] | false> {
        const result = await this.getConnection().raw(`
            SELECT * FROM galeria_collection as c
            JOIN galeria_image_collection as ic ON ic.collection_id = c.id
            WHERE ic.image_id = '${image_id}';`)
        return this.toConnectionsModel(result[0]);
    }
    public async selectCollectionAll(user_id:string): Promise<CollectionMoreDetails[]>{
    	try{
            const result = await this.getConnection().raw(`
            SELECT DISTINCT '' as id, 'Todos' as name, '${user_id}' as author_id,
            count(*) as number_of_images,
            (SELECT si.file FROM galeria_image as si 
           JOIN galeria_image_collection as sic ON sic.image_id = si.id
            ORDER BY si.date DESC LIMIT 1) as image_file
           FROM galeria_image as si
           WHERE si.author_id = '${user_id}'
            UNION
           SELECT DISTINCT  c.id, c.name, c.author_id, count(*), (SELECT si.file FROM galeria_image as si 
           JOIN galeria_image_collection as sic ON sic.image_id = si.id 
            WHERE sic.collection_id = c.id 
            ORDER BY si.date DESC LIMIT 1) 
           FROM galeria_image_collection as ic
           LEFT JOIN galeria_collection as c ON ic.collection_id = c.id
           LEFT JOIN galeria_image as i ON ic.image_id = i.id
           WHERE i.author_id = '${user_id}'
           GROUP BY c.id
            `)
            return this.toConnectionsMoreDetailModel(result[0])
         }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async selectImagesByCollection(collection_id:string): Promise<Image[]>{
    	try{
            const result = await this.getConnection().raw(`
            SELECT i.id, i.subtitle, i.date, i.file, i.author_id,
            u.name as author_name, u.nickname as author_nickname
           FROM galeria_image as i
           LEFT JOIN galeria_user as u ON u.id = i.author_id
           LEFT JOIN galeria_image_collection as ic ON ic.image_id = i.id 
           LEFT JOIN galeria_collection as c ON c.id = ic.collection_id
           WHERE  c.id = '${collection_id}'
           ORDER BY i.date DESC
            `) 
            return this.toImagesModel(result[0])
         }
        catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    private toConnectionsModel(result: any): Collection[] {
        const collections = result.map((collectionResult: any) => {
            const {
                id,
                name,
                author_id
                
            } = collectionResult;

            const collection = new Collection(
                id,
                name,
                author_id
            );
            return collection
        })

        return collections;
    }
    private toConnectionsMoreDetailModel(result: any): CollectionMoreDetails[] {
        const collections = result.map((collectionResult: any) => {
            const {
                id,
                name,
                author_id,
                image_file,
                number_of_images
            } = collectionResult;

            const collection = new CollectionMoreDetails(
                id,
                name,
                author_id,
                image_file,
                number_of_images
            );
            return collection
        })

        return collections;
      
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