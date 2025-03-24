import express from "express";
import { addCatagory, getAllCatagory } from "../controllers/catagoryController.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/addCatagory").post(authMiddleware, addCatagory);
router.route("/allCatagory").get(getAllCatagory);

export default router;