import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { instance } from "../../service";
import { UserType } from "../../confirg/interface";

export const fetchAllUsers: any = createAsyncThunk('account/fetchAll', async () => {
    const response = await instance.get('/users'); 
    return response.data;
  });

export const updateUserRole: any = createAsyncThunk('account/updateUserRole', async ({ userId, role }: { userId: number, role: boolean }) => {
    const response = await instance.put(`/api/users/${userId}`, { role });
    return response.data;
  });  
  
interface AccountState {
    isLoading: boolean;
    error: string;
    accounts: Array<UserType>;
}  
  

const initState:AccountState = {
    isLoading: false,
    error: "",
    accounts: []
}


const accountSlice = createSlice({
    name:"acccount",
    initialState : initState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchAllUsers.pending, (state) => {
            // bắt đầu call API
            state.isLoading = true
        });
        builder.addCase(fetchAllUsers.fulfilled,(state, action) => {
             // đã nhận được call APi
             state.isLoading = false;
             state.accounts = action.payload;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
             // xử lí lỗi
             state.isLoading = false;
             state.error = action.error.message;
        })
        
        
    }
})
export const {reducer} = accountSlice