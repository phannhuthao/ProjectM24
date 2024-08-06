import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getAllProduct } from "../../page/AdminPage/product";

// lấy về danh sách
export const fetchAllProduct : any = createAsyncThunk('products/getAll', async()=> {
    let res = await getAllProduct();
    return res.data
})


// khai báo slice
const productSilce = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        error: "",
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProduct.pending, (state) => {
            // bắt đầu call API
            state.isLoading = true
        });
        builder.addCase(fetchAllProduct.fulfill, (state, action) => {
             // đã nhận được call APi
        });
        builder.addCase(fetchAllProduct.rejeact, (state, action) => {
            // 
        })

    }
})