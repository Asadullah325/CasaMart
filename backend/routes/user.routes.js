import express from "express";
import { loginUser, logoutUser, registerUser, verifyEmail } from "../controllers/user.contollers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email/:id").post(verifyEmail);
router.route("/logout").get(authMiddleware, logoutUser);

export default router;

