import { ProductVariant } from "./product"

export interface CartItemTest {
    name: string
    price: number
    photo: string
    discount: number
    color: string
    colorCode: string
    size: string
    quantity: number
    slug: string
}

export interface CartItem {
    id: number
    name: string
    price: number
    photo: string
    discount: number
    quantity: number
    slug: string
    productVariant: ProductVariant
}