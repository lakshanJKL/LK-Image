import { asc, eq ,sql} from "drizzle-orm";
import db from "../db/connections";
import { image } from "../db/schema";
import {v4 as uuidv4} from 'uuid';

export const createImage = async (imgData:any)=>{ 

  const uuid = uuidv4(); 

  // save new image
  const newImage = await db.insert(image).values({
    id:uuid,
    category:imgData.category,
    imgLink:imgData.imgLink,
    imgName:imgData.imgName,
  });

  return {status:true,data:newImage};
}


export const updateImage = async (id:string,imgData:any)=>{ 

  // find the image
  const selectedImage = await db.select().from(image).where(eq(image.id,id));

  if(selectedImage.length === 0){
   const error:CustomError = new Error("Image not found");
   error.status = 404;
   throw error; 
  }

  // update the image
  const updateImage = await db.update(image).set({
    category:imgData.category,
    imgLink:imgData.imgLink,
    imgName:imgData.imgName,
  }).where(eq(image.id,selectedImage[0].id));

  return {status:true,data:updateImage};
}

export const findImageByID = async (imageId:string)=>{
  
  // find the image
  const selectedImage = await db.select().from(image).where(eq(image.id,imageId));

  if(selectedImage.length === 0){
    const error:CustomError = new Error("Image not found");
    error.status = 404;
    throw error; 
  }

  return {status:true, data:selectedImage[0]};
}

export const findAllImages = async (searchText:string,page:number,pageSize:number)=>{

  const whereClause = searchText ? eq(image.category, searchText) : undefined;

  // find all images with pagination
  const getImages = await db
          .select()
          .from(image)
          .where(whereClause)
          .orderBy(asc(image.id))
          .limit(pageSize)
          .offset((page-1)*pageSize);

  const totalCount = await db
          .select({count:sql<number>`count(*)`})
          .from(image)
          .where(whereClause);       

  return {status:true,count:totalCount[0].count,data:getImages};        
}

export const deleteImageById= async (id:string)=>{

  // find the image
  const selectedImage = await db.select().from(image).where(eq(image.id,id));

  if(selectedImage.length === 0){
    const error:CustomError = new Error("Image not found");
    error.status = 404;
    throw error; 
  }

  // delete the image
  await db.delete(image).where(eq(image.id,id));
  return {status:true};
}
