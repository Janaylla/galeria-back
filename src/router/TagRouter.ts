import express from 'express';
import { TagController } from '../controller/TagController';

const tagRouter = express.Router();

const tagController = new TagController();

tagRouter.post('', tagController.create);

export { tagRouter };
