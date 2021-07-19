import express from 'express';
import { CollectionController } from '../controller/CollectionController';

const collectionRouter = express.Router();

const collectionController = new CollectionController();

collectionRouter.post('', collectionController.create);
collectionRouter.get('', collectionController.getAll);
collectionRouter.put('/:collection/images', collectionController.putCollectionImage);
collectionRouter.get('/details', collectionController.getAllMoreDetails);


export { collectionRouter };
