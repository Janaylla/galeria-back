import { Request, Response } from 'express';
import { TagBusiness } from '../business/TagBusiness';
import { BaseData } from '../data/BaseData';
import { tag } from '../types/tag'

export class TagController {
  public async create(request: Request, response: Response) {
    try {
      const { name } = request.body;

      const tagBusiness = new TagBusiness();
      await tagBusiness.create({
        name
      })

      response.json({ message: 'Success' });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async getById(request: Request, response: Response) {
    try {
      const { id } = request.body;

      const tagBusiness = new TagBusiness();
      const tag = await tagBusiness.getById({ id: id })

      response.json({ message: 'Success', tag });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async getByIds(request: Request, response: Response) {
    try {
      const { ids } = request.body;

      const tagBusiness = new TagBusiness();
      const tags = await tagBusiness.getByIds(ids)

      response.json({ message: 'Success', tags });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async getAll(request: Request, response: Response) {
    try {

      const tagBusiness = new TagBusiness();
      const tags = await tagBusiness.getAll()

      response.json({ message: 'Success', tags });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
}
