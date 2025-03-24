import SummaryApi from "../common/SummaryApi";
import axiosInstance  from "./Axios";

const imageUpload = async (image) => {
    try {

        const formData = new FormData();
        formData.append("image", image);

        const res = await axiosInstance({
            ...SummaryApi.uploadImage,
            data: formData
        })

        return res
    } catch (error) {
        console.log(error);
    }
}

export default imageUpload