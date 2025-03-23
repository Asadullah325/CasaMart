import axiosInstance from "./Axios"
import SummaryApi from "@/common/SummaryApi"

const fetchYserDetails = async () => {
    try {
        const res = await axiosInstance({
            ...SummaryApi.getUserDetails,
        })
        return res?.data?.user
    } catch (error) {
        console.log(error.message);
        return
    }
}

export default fetchYserDetails