import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../service";
import { CartItem } from "../../confirg/interface";



export const fetchAllCart: any = createAsyncThunk('cart/fetchAllCart', async (userId: number) => {
    const response = await instance.get(`users/${userId}`);
    return response.data;
});

// xóa 1 sản phẩm trong giỏ hàng
export const deleteCartItem: any = createAsyncThunk('cart/deleteCartItem', async (cartItemId: number) => {
    await instance.delete(`cart/${cartItemId}`);
    return cartItemId;
});


// xóa tất cả sản phẩm trong giỏ hàng
export const deleteAllCartItems: any = createAsyncThunk('cart/deleteAllCartItems', async (userId: number) => {
    await instance.delete(`users/${userId}/cart`);
    return userId;
});
// // Tổng số tiền của sản phẩm trongg giỏ hàng
// export const totalPrice: any = createAsyncThunk('cart/totalPrice', async(price: number)=> {
//     await instance.
// })


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isLoading: false,
        error: "",
        cart: [] as CartItem[],
    },
    reducers: {},
    extraReducers: (builder) => {


        // Handle fetchAllCart
        builder
            .addCase(fetchAllCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.carts;
            })
            .addCase(fetchAllCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Error fetching cart';
            })
            // Xóa 1 sản phẩm
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.cart = state.cart.filter(item => item.productId !== action.payload);
            })
            // Xóa tất cả sản phẩm
            .addCase(deleteAllCartItems.fulfilled, (state) => {
                state.cart = [];
            });
    }
});

export const { reducer } = cartSlice;
