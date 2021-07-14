import { Image } from '../entities/Image'
import { Collection } from '../entities/Collection';
import { CustomError } from '../error/CustomError';
import { BaseData } from './BaseData'

export class ImageCollectionData extends BaseData {
    private static TABLE_NAME = 'galeria_image_collection';

    public async create(image: Image): Promise<true | false> {
        try {
            console.log("asd")
            const id_image = image.getId()
            const collections = image.getCollections()
            if (!id_image) {
                throw new CustomError('Image not found', 400);
            }
            if (!collections) {
                throw new CustomError('Collection not found', 400);
            }
            console.log("collections", collections)
            collections.forEach(async (collection: Collection) => {
                await this.getConnection().raw(`
                INSERT INTO ${ImageCollectionData.TABLE_NAME}
                 (image_id, collection_id) VALUES ('${id_image}', '${collection.getId()}')
                `)
            })

            return true;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}