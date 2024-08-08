import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { instance } from "../../service";
import { loginApi } from "../../service/User/auth";


// export const fetchAllUsers: any = createAsyncThunk('users/fetchAll', async () => {
//     const response = await axios.get('/path/to/data.json'); // Thay đổi đường dẫn đến file data.json
//     return response.data.users;
//   });

const initState = {
    isLoading: false,
    error: "",
    userLogin:{}
}

export const registerUser: any = createAsyncThunk('user/register', async (data:{})=> {
    // call api
    const res = await instance.post("register",data)
    return res.data;
})

export const loginUser: any = createAsyncThunk('user/login', (data: {email: string, password: string})=> {
    return loginApi(data)
})

const userSlice = createSlice({
    name:"user",
    initialState : initState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(registerUser.fulfilled,(state, action)=>{
            // cập nhật state
            state.userLogin = action.payload
            
            // lưu token vào local
            localStorage.setItem("access_token",action.payload.accessToken)
        })

        builder.addCase(loginUser.fulfilled,(state,action)=>{
           // đăng nhập thành công 
           console.log(action);
           localStorage.setItem('access_token',action.payload.accessToken);
           state.userLogin = action.payload.user
        })
        .addCase(loginUser.rejected,(state,action)=>{
            // đăng nhập thành công 
            if(action.payload.status === 400) {
                state.error = "tên đăng nhập hoặc mật khẩu không đúng"
            }
         })
    }
})
export const {reducer} = userSlice