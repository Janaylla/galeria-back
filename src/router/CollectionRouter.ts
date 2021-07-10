import express from 'express';
import { CollectionController } from '../controller/CollectionController';

const collectionRouter = express.Router();

const collectionController = new CollectionController();

collectionRouter.post('', collectionController.create);

export { collectionRouter };
