import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../service";
import { CartItem } from "../../confirg/interface";


export const fetchAllCart: any = createAsyncThunk('cart/fetchAllCart', async (userId: number) => {
  const response = await instance.get(`users/${userId}`);
  return response.data;
});

// xóa 1 sản phẩm trong giỏ hàng
export const deleteCartItem: any = createAsyncThunk('cart/deleteCartItem', async ({ userId, carts }: { userId: number, carts: CartItem[] }) => {
  console.log(carts);
  const res = await instance.patch(`users/${userId}`, { carts: carts });
  console.log(res.data);
  return res.data.carts;
});

// xóa tất cả sản phẩm trong giỏ hàng
export const deleteAllCartItems: any = createAsyncThunk('cart/deleteAllCartItems', async (userId: number) => {
  await instance.patch(`users/${userId}`, { carts: [] });
  return [];
});

// xóa 1 sản phẩm yêu thích 
export const deleteWishlistItem: any = createAsyncThunk('wishlist/delete', async ({ userId, wishlist }: { userId: number; wishlist: any[] }) => {
  const res = await instance.patch(`users/${userId}`, { wishlist });
  return res.data.wishlist;
}
);

// xóa tất cả sản phẩm yêu thích
export const deleteAllWishlistItem: any = createAsyncThunk('wishlist/deleteAll', async (userId: number) => {
  const res = await instance.patch(`users/${userId}`, { wishlist: [] });
  return res.data.wishlist;
}
);

// tăng giảm số lượng sản phẩm trong giỏ hàng
export const updateProductCart: any = createAsyncThunk('cart/updateProductCart', async ({ cart, userId }: { cart : Array<{productId:number,quantity:number}>, userId: number }) => {
  const response = await instance.patch(`users/${userId}`, { carts: cart });
  return response.data.carts;
}
);



const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isLoading: false,
    error: "",
    cart: [] as CartItem[],
    wishlist: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // sp
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
        state.cart = action.payload;
      })
      // Xóa tất cả sản phẩm
      .addCase(deleteAllCartItems.fulfilled, (state) => {
        state.cart = [];
      })
      // Xóa 1 sản phẩm yêu thích
      .addCase(deleteWishlistItem.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      // Xóa tất cả sản phẩm yêu thích
      .addCase(deleteAllWishlistItem.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      // Cập nhật số lượng sản phẩm
      .addCase(updateProductCart.fulfilled, (state, action) => {
        state.cart = action.payload
      });
  }
});

export const { reducer } = cartSlice;
