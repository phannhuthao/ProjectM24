// userSlice.tsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../service";
import { loginApi } from "../../service/User/auth";
import { UserType } from "../../confirg/interface";

interface UserState {
  isLoading: boolean;
  error: string;
  userLogin: UserType | null;
  userInfo: UserType | null
}

const initialState: UserState = {
  isLoading: false,
  error: "",
  userLogin: null,
  userInfo: null
};

export const registerUser: any = createAsyncThunk('user/register', async (data: any) => {
  const res = await instance.post("register", data);
  return res.data;
});

export const loginUser: any = createAsyncThunk('user/login', async (data: { email: string; password: string }) => {
  return loginApi(data);
});

export const fetchUser : any= createAsyncThunk('user/fetchUser', async () => {
  const id = localStorage.getItem("userId") || null;
  const res = await instance.get(`users/${id}`);
  return res.data;
});

export const updateUser: any = createAsyncThunk('user/update', async (data: UserType) => {
  const id = localStorage.getItem("userId") || '';
  const res = await instance.put(`/users/${id}`, data);
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // đăng kí
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userLogin = action.payload.user;
        localStorage.setItem("access_token", action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Đăng kí thất bại";
      })
      // đăng nhập
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('access_token', action.payload.accessToken);
        localStorage.setItem('userId', action.payload.user.id);
        state.userLogin = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Đăng nhập thất bại";
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Lỗi hiển thị người dùng";
      })
      // cập nhật
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userId', action.payload.id);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Lỗi khi cập nhật thông tin user";
      });
  }
});

export const { reducer } = userSlice;
