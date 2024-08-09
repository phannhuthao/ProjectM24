import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProduct } from "../../page/AdminPage/product";
import { ProductType } from "../../confirg/interface";
import { instance } from "../../service";

export const fetchAllProduct: any = createAsyncThunk('products/getAll', async () => {
    const res = await getAllProduct();
    return res.data;
});

// xóa sp
export const deleteProduct: any = createAsyncThunk('products/delete', async (productId: number) => {
    await instance.delete(`/products/${productId}`);
    return productId;
});

// sửa thông tin sp
export const editProduct : any = createAsyncThunk('products/edit', async (product: ProductType) => {
    const response = await instance.put(`/products/${product.id}`, product);
    return response.data;
});


const init: ProductType[] = [];

const productSlice = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        error: "",
        products: init,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "An error occurred while fetching products.";
            })
            // xóa 
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "An error occurred while deleting the product.";
            })
            // sửa
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                );
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "An error occurred while updating the product.";
            })
    }
});

export const { reducer } = productSlice;
