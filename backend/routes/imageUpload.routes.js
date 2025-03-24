import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { uploadImage } from "../controllers/uploadImagesController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/upload").post(authMiddleware,upload.single("image"), uploadImage);

export default router;