import express from 'express';
import { ImageController } from '../controller/ImageController';

const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post('', imageController.create);
imageRouter.get('', imageController.getAll);
imageRouter.put('/tag', imageController.putImageTag);
imageRouter.delete('/:id', imageController.del);

imageRouter.delete('/:image/tag/:tag', imageController.delImageTag);
imageRouter.put('/:image/tag/:tag', imageController.putImageTag);

imageRouter.delete('/:image/collection/:collection', imageController.delImageCollection)
imageRouter.put('/:image/collection/:collection', imageController.putImageCollection);

imageRouter.get('/:id', imageController.getById);

export { imageRouter };
