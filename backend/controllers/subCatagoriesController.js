import SubCatagory from "../models/sub_catagory.model.js";

export const addSubCatagory = async (req, res) => {
    try {
        const { name, image, catagory } = req.body;

        if (!name || !image || !catagory) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const newSubCatagory = new SubCatagory({
            name,
            image,
            catagory
        })

        const savedSubCatagory = await newSubCatagory.save();

        if (!savedSubCatagory) {
            return res.status(400).json({
                message: "SubCatagory not added",
                success: false
            });
        }

        res.status(200).json({
            message: "SubCatagory added successfully",
            success: true,
            subCatagory: savedSubCatagory
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const getAllSubCatagory = async (req, res) => {
    try {

        const subCatagory = await SubCatagory.find().sort({ createdAt: -1 }).populate("catagory");

        if (!subCatagory) {
            return res.status(400).json({
                message: "SubCatagory not found",
                success: false
            });
        }

        res.status(200).json({
            message: "SubCatagory fetched successfully",
            success: true,
            subCatagory
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}