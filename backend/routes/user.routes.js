import express from "express";
import { forgotPassword, getUserDetails, loginUser, logoutUser, refreshToken, registerUser, resetPassword, updateDetails, uploadUserImage, verifyEmail, verifyOTP } from "../controllers/user.contollers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email/:id").post(verifyEmail);
router.route("/logout").get(authMiddleware, logoutUser);
router.route("/upload-image").put(authMiddleware, upload.single("avatar"), uploadUserImage);
router.route("/update-user").put(authMiddleware, updateDetails);
router.route("/forget-password").put(forgotPassword)
router.route("/verify-otp").put(verifyOTP)
router.route("/reset-password").put(resetPassword)
router.route("/refresh-token").post(refreshToken);
router.route("/getUserDetails").get(authMiddleware, getUserDetails);

export default router;

