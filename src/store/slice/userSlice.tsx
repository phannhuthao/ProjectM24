import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../service";
import { loginApi } from "../../service/User/auth";
import { UserType } from "../../confirg/interface";

interface UserState {
  isLoading: boolean;
  error: string;
  userLogin: UserType | null;
}

const initialState: UserState = {
  isLoading: false,
  error: "",
  userLogin: null,
};

export const registerUser: any = createAsyncThunk('user/register', async (data: any) => {
  const res = await instance.post("register", data);
  return res.data;
});

export const loginUser: any = createAsyncThunk('user/login', async (data: { email: string; password: string }) => {
  return loginApi(data);
});

export const fetchUser: any = createAsyncThunk('user/fetchUser', async () => {
  const res = await instance.get("users");
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.error = action.error.message || "Failed to register";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('access_token', action.payload.accessToken);
        state.userLogin = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userLogin = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  }
});

export const { reducer } = userSlice;
