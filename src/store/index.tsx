// cấu hình store

import { configureStore } from "@reduxjs/toolkit";
import { reducer as user  } from "../store/slice/userSlice";
import { reducer as product  } from "../store/slice/productSlice";
import { reducer as account} from "./slice/accountslice";


export const store = configureStore({
    reducer:{
        user : user,
        product: product,
        account: account
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>