// call API
// Api đăng nhập

import {instance} from '..'

// api đăng kí

export const registerUser: any = async(user: {}) => {
    const res = await instance.post("register", user);
    return res.data;
}

export const loginApi = async(data: {email: string, password: string}) => {
    const res  = await instance.post("login",data);
    return res.data;
}