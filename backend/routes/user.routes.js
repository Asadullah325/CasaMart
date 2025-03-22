import express from "express";
import { loginUser, logoutUser, registerUser, uploadUserImage, verifyEmail } from "../controllers/user.contollers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email/:id").post(verifyEmail);
router.route("/logout").get(authMiddleware, logoutUser);
router.route("/upload-image").put(authMiddleware, upload.single("avatar"), uploadUserImage);

export default router;

