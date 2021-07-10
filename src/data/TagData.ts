import { Tag } from '../entities/Tag'
import { BaseData } from './BaseData'

export class TagData extends BaseData {
    private static TABLE_NAME = 'galeria_tag';

    public async create(tag: Tag): Promise<Tag | false> {
        try {
            await this.getConnection().insert(tag).into(TagData.TABLE_NAME);

            const BaseData = await this.getById(tag.getId());

            return BaseData;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getById(id: string): Promise<Tag | false> {
        try {
            const result = await this.getConnection()
                .select()
                .where({ id: id })
                .into(TagData.TABLE_NAME);

            if (!result.length || !result[0].name) {
                return false;
            }
            return this.toTagModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getAll(): Promise<Tag[] | false> {
        try {
            const result = await this.getConnection()
                .select()
                .into(TagData.TABLE_NAME);

            if (!result.length || !result[0].name) {
                return false;
            }
            return this.toTagsModel(result);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    private toTagModel(result: any): Tag {
        const {
            id,
            name
        } = result;

        const tag = new Tag(
            id,
            name
        );

        return tag;
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