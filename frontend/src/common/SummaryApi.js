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
    logout : {
        url: `${BASE_URL}/api/user/logout`,
        method: "GET",
    }
}

export default SummaryApi