import express from 'express';
import { TagController } from '../controller/TagController';

const tagRouter = express.Router();

const tagController = new TagController();

tagRouter.post('', tagController.create);
tagRouter.get('', tagController.getAll);

export { tagRouter };
