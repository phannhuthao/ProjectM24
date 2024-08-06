// cấu hình store

import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../store/slice/userSlice";


export const store = configureStore({
    reducer:{
        user : reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>