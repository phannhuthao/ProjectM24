// lấy danh sách sản phẩm về

import { ProductType } from "../../confirg/interface";
import { instance } from "../../service"

export const getAllProduct = () => {
    return instance.get("products");
}

// thêm mới 

export const addNewProduct = (data : ProductType) => {
    return instance.post('products', data);
}

// sửa 
export const editProduct = (id: number , data: ProductType) => {
    return instance.put(`products/${id}`, data);
}

// xóa
export const deleteProduct = (id: number) => {
    return instance.delete(`products/${id}`);
}