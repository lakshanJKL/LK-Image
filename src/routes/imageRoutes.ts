import express  from "express";
import * as imageController  from "../controllers/imageController";
import authMiddleware from "../middleware/authHandler";

const router = express.Router();

router.post("/create",authMiddleware,imageController.createImage);
router.put("/update-image/:id",authMiddleware,imageController.updateImage);
router.get("/get-all-images",authMiddleware,imageController.getAllImagePaginate);
router.get("/get-image/:id",authMiddleware,imageController.getImageById);
router.delete("/delete-image/:id",authMiddleware,imageController.deleteImageById);

export default router;