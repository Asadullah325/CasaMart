import Catagory from "../models/catagory.model.js";
import SubCatagory from "../models/sub_catagory.model.js";
import Product from "../models/product.model.js";


export const addCatagory = async (req, res) => {
    try {
        const { name, image } = req.body;

        if (!name || !image) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const newCatagory = new Catagory({
            name,
            image
        })

        const savedCatagory = await newCatagory.save();

        if (!savedCatagory) {
            return res.status(400).json({
                message: "Catagory not added",
                success: false
            });
        }

        res.status(200).json({
            message: "Catagory added successfully",
            success: true,
            catagory: savedCatagory
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const getAllCatagory = async (req, res) => {
    try {

        const catagory = await Catagory.find().sort({ createdAt: -1 });

        if (!catagory) {
            return res.status(400).json({
                message: "Catagory not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Catagory fetched successfully",
            success: true,
            catagory
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const updateCatagory = async (req, res) => {
    try {
        const { catagoryId, name, image } = req.body;

        if (!name || !image) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const updatedCatagory = await Catagory.findByIdAndUpdate({ _id: catagoryId }, {
            name,
            image,
        }, { new: true });

        if (!updatedCatagory) {
            return res.status(400).json({
                message: "Catagory not updated",
                success: false
            });
        }

        res.status(200).json({
            message: "Catagory updated successfully",
            success: true,
            catagory: updatedCatagory
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}

export const deleteCatagory = async (req, res) => {
    try {
        const { catagoryId } = req.body;

        if (!catagoryId) {
            return res.status(400).json({
                message: "Catagory id is required",
                success: false
            });
        }

        const checkSubCatagory = await SubCatagory.find({
            catagory: {
                $in: [catagoryId]
            }
        }).countDocuments();

        const checkProduct = await Product.find({
            catagory: {
                $in: [catagoryId]
            }
        }).countDocuments();

        if (checkSubCatagory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "This catagory cannot be deleted",
                success: false
            });
        }

        const deletedCatagory = await Catagory.findByIdAndDelete({ _id: catagoryId });

        if (!deletedCatagory) {
            return res.status(400).json({
                message: "Catagory not deleted",
                success: false
            });
        }

        res.status(200).json({
            message: "Catagory deleted successfully",
            success: true,
            catagory: deletedCatagory
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}