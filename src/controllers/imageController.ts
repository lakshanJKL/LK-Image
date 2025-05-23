import {NextFunction, Request,Response} from 'express';
import * as imageService from '../services/imageService';

/*  save new image  */
export const createImage = async (req:Request,res:Response,next:NextFunction):Promise<any> =>{
    
  try{

    const imgData = req.body;
    const img = await imageService.createImage(imgData);
    res.status(201)
       .send({staus:true,data:img,message:"image created"});

  }catch(e){
    next(e);
  }
}


/* update the image */
export const updateImage = async (req:Request,res:Response,next:NextFunction):Promise<any> =>{
  
  try{

     const imgData = req.body;
     const imgId = req.params.id;
     const updatedImg = await imageService.updateImage(imgId,imgData);
     res.status(201)
        .send({status:true,data:updatedImg, message:"image updated"});

   }catch(e){
     next(e);
   }
}

/* find all images with search text */
export const getAllImagePaginate = async (req:Request,res:Response,next:NextFunction):Promise<any> =>{
  
  try{

    const searchText =  req.query.searchText as string || "";
    const pageSize =  parseInt(req.query.pageSize as string) || 5;
    const page =  parseInt(req.query.page as string) || 1;

    const getAllImages = await imageService.findAllImages(searchText,page,pageSize);
    res.status(200)
       .send({status:true,data:getAllImages,message:"Get all images"});

  }catch(e){
    next(e);
  }
}

/*  find image by id */
export const getImageById = async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
   
  try{
    const id = req.params.id;
    const getImg = await imageService.findImageByID(id);
    res.status(200)
       .send({status:true,data:getImg,message: id +" : get image "});

  }catch(e){
    next(e);
  }
}

/*  delete image by id  */
export const deleteImageById = async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
   
  try{
    const id = req.params.id;
    await imageService.deleteImageById(id);
    res.status(204)
       .send({status:true,message: id +" : image deleted "});

  }catch(e){
    next(e);
  }
}