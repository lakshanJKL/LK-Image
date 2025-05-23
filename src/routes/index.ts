import express from 'express';
import userRoutes from './userRoutes';
import imageRoutes from './imageRoutes';

const router = express.Router();

router.use("/users",userRoutes);
router.use("/images",imageRoutes);

export default router;