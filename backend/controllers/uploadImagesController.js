import uploadImageCloudinary from "../utils/uploadimageCloudinary.js";

export const uploadImage = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "Please select a file",
                success: false
            });
        }
        const uploadImage = await uploadImageCloudinary(file);

        res.status(200).json({
            message: "Image uploaded successfully",
            success: true,
            data: {
                url: uploadImage.secure_url,
                public_id: uploadImage.public_id
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        })
    }
}