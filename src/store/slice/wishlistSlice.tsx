import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../service";
import Wishlist from "../../page/UserPage/wishlist";

// thêm mới sản phẩm yêu thích


// xóa và thêm mới 1 sản phẩm yêu thích 
export const updateWishlist: any = createAsyncThunk('wishlist/delete', async ({ userId, wishlist }: { userId: number; wishlist: number[] }) => {
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
  export const fetchAllWishList: any = createAsyncThunk('wishlist/fetchAllWishlist', async (userId: number) => {
    const response = await instance.get(`users/${userId}`);
    return response.data.wishlist;
  });


  const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
      isLoading: false,
      error: "",
      wishlist: [] as number[],
    },
    reducers: {},
    extraReducers: (builder) => {
      // sp
      builder
        // Xóa 1 sản phẩm yêu thích
        .addCase(updateWishlist.fulfilled, (state, action) => {
          state.wishlist = action.payload;
        })
        
        .addCase(fetchAllWishList.fulfilled, (state, action) => {
          state.wishlist = action.payload;
        })

       
       
    }
  });
  
  export const { reducer } = wishlistSlice;
  