import db from '../db/connections';
import {user} from '../db/schema';
import {v4 as uuidv4} from 'uuid';
import {hashPassword,comparePassword} from '../util/bcrypt';
import {eq} from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const secret:any = process.env.SECRET_KEY;

export const userLogin = async (userData:any)=>{

       // find the user
       const selectedUser =  await db.select().from(user).where(eq(user.email,userData.email));

       if(selectedUser.length === 0){
          const error:CustomError = new Error("User mot found");
          error.status = 404;
          throw error;
       }       
       
       // check the password
       const isConfirmed = await comparePassword(userData.password,selectedUser[0].password);

       if(!isConfirmed){
          const error:CustomError = new Error("Invalid password");
          error.status = 400;
          throw error;
       }

       // create new token
       const token =  jwt.sign({email:selectedUser[0].email},secret,{expiresIn:"5h"});
       return {status:true,data:token};
}

export const createUser = async (userData:any)=>{

      // find the user
      const selectedUser = await db.select().from(user).where(eq(user.email,userData.email));

      if(selectedUser.length > 0){
         const error:CustomError = new Error("User already exists");
         error.status = 409;
         throw error;
        }

      // Generate UUID
      const uuid = uuidv4();

      // hash password
      const password = await hashPassword(userData.password);
      
      const newUser = await db.insert(user).values({
        id:uuid,
        firstName:userData.firstName,
        lastName:userData.lastName,
        email:userData.email,
        password
      })

      return {status:true,data:newUser?.[0]};
}
