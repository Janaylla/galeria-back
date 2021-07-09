import express from 'express';
import { UserController } from '../controller/UserController';

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup', userController.signup);

export { userRouter };
