import {NextFunction, Request,Response} from 'express';
import * as userService from '../services/userService';

/*  user login */
export const login = async (req:Request,res:Response,next:NextFunction):Promise<any> => {
  try{

    const userData = req.body;
    const token = await userService.userLogin(userData);
    return res
           .status(200)
           .send({status:true,data:token,message:"user logged in"});

  }catch(e){
    return next(e);
  }
}

/* new user signup */
export const signup = async (req:Request,res:Response,next:NextFunction):Promise<any> => {
  try{

   const userData = req.body;
   const newUser = await userService.createUser(userData);
   return res
          .status(201)
          .send({status:true,data:newUser,message:"User created"});
          
  }catch(e){
    return next(e);
  }
}