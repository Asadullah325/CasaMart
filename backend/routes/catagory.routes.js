import express from "express";
import { addCatagory, deleteCatagory, getAllCatagory, updateCatagory } from "../controllers/catagoryController.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/addCatagory").post(authMiddleware, addCatagory);
router.route("/allCatagory").get(getAllCatagory);
router.route("/updateCatagory").put(authMiddleware,updateCatagory);
router.route("/deleteCatagory").delete(authMiddleware,deleteCatagory);

export default router;