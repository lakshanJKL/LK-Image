import express from 'express';
import * as  userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post("/login",userController.login);
userRouter.post("/signup",userController.signup);

export default userRouter;