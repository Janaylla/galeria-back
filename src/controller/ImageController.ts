import { Request, Response } from 'express';
import { ImageBusiness } from '../business/ImageBusiness';
import { BaseData } from '../data/BaseData';

export class ImageController {
  public async create(request: Request, response: Response) {
    try {
      const { 
        subtitle,
        file,
        tags,
        collection } = request.body;
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      await imageBusiness.create({
        subtitle,
        file,
        tags,
        collection 
      })

      response.json({ message: 'Success' });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
}
