import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (image) => {
    try {
        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

        const uploadImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: 'CASAMART',
                resource_type: 'auto'
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(buffer);
        });

        return uploadImage

    } catch (error) {
        console.log(error.message);
    }
}

export default uploadImageCloudinary