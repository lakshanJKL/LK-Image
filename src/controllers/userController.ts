import {NextFunction, Request,Response} from 'express';
import * as userService from '../services/userService';

export const login = async (req:Request,res:Response,next:NextFunction)=>{
  try{
    
    const userData = req.body;
    const token = await userService.userLogin(userData);
    return res
           .status(200)
           .send({status:true,data:token,message:"user logged in"});

  }catch(e){
    return next(e)
  }
}

export const signup = async (req:Request,res:Response,next:NextFunction)=>{
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