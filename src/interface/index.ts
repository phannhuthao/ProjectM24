export type UserType = {
    "email": string,
    "password": string,
    "passwordConfirm": string,
    "fullName": string,
    "phone": string,
    "birthday": string,
    "id": number,
    "role": boolean
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