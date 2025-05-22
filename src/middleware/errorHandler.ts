import { NextFunction, Response, Request } from "express";

const errorHandler = (err:CustomError, req:Request, res:Response ,next:NextFunction)=>{
 if(err.status){
    res.status(err.status).json({message:err.message})
 }else{
    res.status(500).json({message:err.message});
 }
}

export default errorHandler;