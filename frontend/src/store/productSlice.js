import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCatagories: [],
    allSubCatagories: [],
    allProducts: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setAllCatagories: (state, action) => {
            state.allCatagories = action.payload;
        }
    },
});

export const { setAllCatagories } = productSlice.actions;

export default productSlice.reducer;