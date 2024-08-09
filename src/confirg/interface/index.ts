export type UserType = {
    "email": string,
    "password": string,
    "passwordConfirm": string,
    "fullName": string,
    "phone": string,
    "birthday": string,
    "status": boolean,
    "id": number,
    "role": string
}

export type ProductType = {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
    quantity: number,
    click: number,
    createAd: string
}