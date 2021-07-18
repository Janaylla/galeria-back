import { Collection } from '../entities/Collection'
import { BaseData } from './BaseData'

export class CollectionData extends BaseData {
    private static TABLE_NAME = 'galeria_collection';

    public async insert(collection: Collection): Promise<Collection | false> {
        try {
            await this.getConnection().insert(collection).into(CollectionData.TABLE_NAME);

            const newCollection = await this.selectById(collection.getId());

            return newCollection;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async selectById(id: string): Promise<Collection | false> {
        try {
            const result = await this.getConnection()
                .select()
                .where({ id: id })
                .into(CollectionData.TABLE_NAME);

            if (!result.length || !result[0].name) {
                return false;
            }
            return this.toCollectionModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async selectAll(): Promise<Collection[] | false> {
        try {
            const result = await this.getConnection()
                .select()
                .into(CollectionData.TABLE_NAME);

            if (!result.length || !result[0].name) {
                return false;
            }
            return (result.map((item) => {
                return this.toCollectionModel(item)
            }));
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    private toCollectionModel(result: any): Collection {
        const {
            id,
            name,
            author_id
        } = result;

        const collection = new Collection(
            id,
            name,
            author_id
        );

        return collection;
    }
}