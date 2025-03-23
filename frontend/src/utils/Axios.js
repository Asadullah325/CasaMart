import axios from "axios";
import SummaryApi, { BASE_URL } from "../common/SummaryApi";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        let originReq = error.config;
        if (error.response.status === 401 && !originReq._retry) {
            originReq._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                const res = await refreshAccessToken(refreshToken);

                if (res) {
                    originReq.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
                    return axiosInstance.request(originReq);
                }
            }


        }
        return Promise.reject(error);
    }
)

const refreshAccessToken = async (refreshToken) => {
    try {
        const res = await axiosInstance({
            ...SummaryApi.refreshToken,
            headers: {
                "Authorization": `Bearer ${refreshToken}`
            }
        })

        if (res.data.error) {
            toast.error(res.data.error);
        }

        if (res.data.success) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
        }

    } catch (error) {
        console.log(error.message);
    }
}

export default axiosInstance