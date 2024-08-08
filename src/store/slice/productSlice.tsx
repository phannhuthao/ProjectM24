import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getAllProduct } from "../../page/AdminPage/product";
import { ProductType } from "../../confirg/interface";

// lấy về danh sách
export const fetchAllProduct : any = createAsyncThunk('products/getAll', async()=> {
    let res = await getAllProduct();
    return res.data
})

const init: ProductType[] = []  

// khai báo slice
const productSilce = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        error: "",
        products: init,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProduct.pending, (state) => {
            // bắt đầu call API
            state.isLoading = true
        });
        builder.addCase(fetchAllProduct.fulfilled,(state, action) => {
             // đã nhận được call APi
             state.isLoading = false;
             state.products = action.payload;
        });
        builder.addCase(fetchAllProduct.rejected, (state, action) => {
             // xử lí lỗi
             state.isLoading = false;
             state.error = action.error.message;
        })

    }
})

export const { reducer } = productSilce