export type CartItem = {productId: number, quantity: number }
export type UserType = {
    "email": string,
    "password": string,
    "passwordConfirm": string,
    "fullName": string,
    "phone": string,
    "birthday": string,
    "comments": string,
    "status": boolean,
    "id": number,
    "role": string
    "cart": CartItem[],
    "wishlist": number[]
}


export type ProductType = {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
    quantity: number,
    createAd: string
}