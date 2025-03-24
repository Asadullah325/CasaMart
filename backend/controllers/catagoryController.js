import Catagory from "../models/catagory.model.js";


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

        const catagory = await Catagory.find();

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