
export const BASE_URL = "http://localhost:3000"

const SummaryApi = {
    register: {
        url: `${BASE_URL}/api/user/register`,
        method: "POST",
    },
    login: {
        url: `${BASE_URL}/api/user/login`,
        method: "POST",
    },
    forgetPassword: {
        url: `${BASE_URL}/api/user/forget-password`,
        method: "PUT",
    },
    verifyOtp: {
        url: `${BASE_URL}/api/user/verify-otp`,
        method: "PUT",
    },
    resetPassword: {
        url: `${BASE_URL}/api/user/reset-password`,
        method: "PUT",
    },
    refreshToken: {
        url: `${BASE_URL}/api/user/refresh-token`,
        method: "POST",
    },
    getUserDetails: {
        url: `${BASE_URL}/api/user/getUserDetails`,
        method: "GET",
    },
    logout: {
        url: `${BASE_URL}/api/user/logout`,
        method: "GET",
    },
    uploadProfile: {
        url: `${BASE_URL}/api/user/upload-image`,
        method: "PUT"
    },
    updateUserDetails: {
        url: `${BASE_URL}/api/user/update-user`,
        method: "PUT"
    },
    addCatagory: {
        url: `${BASE_URL}/api/catagory/addCatagory`,
        method: "POST"
    },
    uploadImage:{
        url: `${BASE_URL}/api/file/upload`,
        method: "POST"
    },
    allCatagory: {
        url: `${BASE_URL}/api/catagory/allCatagory`,
        method: "GET"
    },
    updateCatagory:{
        url: `${BASE_URL}/api/catagory/updateCatagory`,
        method: "PUT"
    },
    deleteCatagory:{
        url: `${BASE_URL}/api/catagory/deleteCatagory`,
        method: "DELETE"
    }
}

export default SummaryApi