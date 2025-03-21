import { ProductVariant } from "./product"
import { nanoid } from "nanoid"

export interface Cart {
    id: string
    userId: number
    cartItems: CartItem[]
}

export class CreateCart {
    id = nanoid()
    userId = null
    cartItems: CartItem[] = []
}

export interface CartItem {
    id: number
    name: string
    price: number
    photo: string
    discount: number
    quantity: number
    slug: string
    category: string
    productVariant: ProductVariant
}