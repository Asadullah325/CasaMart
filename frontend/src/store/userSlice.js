import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    mobile: "",
    avatar: "",
    verify_email: false,
    last_login: "",
    status: "",
    address: [],
    cart: [],
    orders: [],
    forget_password_otp: "",
    forget_password_otp_expiry: "",
    role: "",
    createdAt: "",
    updatedAt: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.mobile = action.payload.mobile;
            state.avatar = action.payload.avatar
            state.verify_email = action.payload.verify_email;
            state.last_login = action.payload.last_login;
            state.status = action.payload.status;
            state.address = action.payload.address;
            state.cart = action.payload.cart;
            state.orders = action.payload.orders;
            state.forget_password_otp = action.payload.forget_password_otp;
            state.forget_password_otp_expiry = action.payload.forget_password_otp_expiry;
            state.role = action.payload.role;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
        logout: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.mobile = "";
            state.avatar = "";
            state.verify_email = false;
            state.last_login = "";
            state.status = "";
            state.address = [];
            state.cart = [];
            state.orders = [];
            state.forget_password_otp = "";
            state.forget_password_otp_expiry = "";
            state.role = "";
            state.createdAt = "";
            state.updatedAt = "";
        }
    }
})

export const { setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;