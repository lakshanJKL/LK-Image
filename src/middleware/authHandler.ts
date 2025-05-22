import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface jwtPayload{
    email:string
}


const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{

    console.log("Request Path:", req.path);
    
    if(req.path == "/users/login" || req.path == "/users/signup"){
      return next();
    }

    const authHeader = req.headers["authorization"];
    console.log("authorization : ",authHeader);
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(" ")[1];

    try{

      const decodedValue = jwt.verify(token,secretKey) as jwtPayload;
      (req as any).user = decodedValue;
      next();

    }catch(e){
       return res.status(403).json({ message: 'Forbidden: Invalid or expired token'})
    }
}

export default authMiddleware;