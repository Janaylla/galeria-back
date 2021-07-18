import { Request, Response } from 'express';
import { CollectionBusiness } from '../business/CollectionBusiness';
import { BaseData } from '../data/BaseData';

export class CollectionController {
  public async create(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const token = request.headers.authorization;
      const collectionBusiness = new CollectionBusiness(token);
      await collectionBusiness.create({
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

      const collectionBusiness = new CollectionBusiness();
      const collection = await collectionBusiness.getById({ id: id })

      response.json({ message: 'Success', collection });

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

      const collectionBusiness = new CollectionBusiness();
      const collections = await collectionBusiness.getByIds(ids)

      response.json({ message: 'Success', collections });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async getAll(request: Request, response: Response) {
    try {

      const collectionBusiness = new CollectionBusiness();
      const collections = await collectionBusiness.getAll()

      response.json({ message: 'Success', collections });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async getAllMoreDetails(request: Request, response: Response) {
    try {
      console.log("asd")
      const token = request.headers.authorization;
      const collectionBusiness = new CollectionBusiness(token);
      const collections = await collectionBusiness.getAllMoreDetails()

      response.json({ message: 'Success', collections });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
}
