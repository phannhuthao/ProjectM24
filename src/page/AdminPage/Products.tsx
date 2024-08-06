import React, { useState } from 'react'
import { ProductType } from '../../interface'

export default function Product() {
    const [pro , setPro] = useState<ProductType>({
        id: 0,
        name: '',
        price: 0,
        image: '',
        createAd: '',
        quantity: 0,
        click: 0,
        description:''
    })

}
