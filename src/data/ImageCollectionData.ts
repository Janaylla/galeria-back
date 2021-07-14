import { Image } from '../entities/Image'
import { Collection } from '../entities/Collection';
import { CustomError } from '../error/CustomError';
import { BaseData } from './BaseData'

export class ImageCollectionData extends BaseData {
    private static TABLE_NAME = 'galeria_image_collection';

    public async create(image: Image): Promise<true | false> {
        try {
            console.log("asd")
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
    public async getByImage(collection_id: string): Promise<Collection[] | false> {

        const result = await this.getConnection().raw(`
        SELECT * FROM galeria_collection as c
        JOIN galeria_image_collection as ic ON ic.collection_id = c.id
        WHERE ic.image_id LIKE '${collection_id}';
        `)
        return this.toConnectionsModel(result[0]);
    }
    private toConnectionsModel(result: any): Collection[] {
        const tags = result.map((tagResult: any) => {
            const {
                id,
                name,
                author_id
            } = tagResult;

            const collection = new Collection(
                id,
                name,
                author_id
            );
            return collection
        })

        return tags;
    }
}