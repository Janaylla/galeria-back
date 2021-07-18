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
        collections } = request.body;
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      await imageBusiness.create({
        subtitle,
        file,
        tags,
        collections
      })

      response.json({ message: 'Success' });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async del(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      await imageBusiness.del({ id })

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
      const { id } = request.params;
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      const image = await imageBusiness.getById({ id })

      response.json({ message: 'Success', image });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async putImageTag(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      const { image, tag } = request.params;
      await imageBusiness.addImageTag({
        image_id: image, tag_id: tag
      })

      response.json({ message: 'Success' });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async delImageTag(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      const { image, tag } = request.params;
      await imageBusiness.delImageTag({
        image_id: image, tag_id: tag
      })

      response.json({ message: 'Success' });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async putImageCollection(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      const { image, collection } = request.params;
      await imageBusiness.addImageCollection({
        image_id: image, collection_id: collection
      })
      response.json({ message: 'Success' });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async delImageCollection(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      const { image, collection } = request.params;
      await imageBusiness.delImageCollection({
        image_id: image, collection_id: collection
      })

      response.json({ message: 'Success' });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
  public async getAll(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      const images = await imageBusiness.getAll()

      response.json({ message: 'Success', images });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }

  public async getByCollection(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const imageBusiness = new ImageBusiness(token);
      const { collection } = request.params
      
      const images = await imageBusiness.getByCollection({ id: collection })

      response.json({ message: 'Success', images });

    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseData.destroyConnection();
  }
}
