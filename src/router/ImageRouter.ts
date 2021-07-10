import express from 'express';
import { ImageController } from '../controller/ImageController';

const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post('', imageController.create);

export { imageRouter };
