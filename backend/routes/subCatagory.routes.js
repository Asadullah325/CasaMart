import express from "express";
import { addSubCatagory, getAllSubCatagory } from "../controllers/subCatagoriesController.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/addSubCatagory").post(authMiddleware, addSubCatagory);
router.route("/getSubCatagory").get(getAllSubCatagory);

export default router;