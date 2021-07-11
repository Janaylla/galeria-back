import express from 'express';
import { ImageController } from '../controller/ImageController';

const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post('', imageController.create);
imageRouter.get('', imageController.getAll);
imageRouter.get('/:id', imageController.getById);

export { imageRouter };
