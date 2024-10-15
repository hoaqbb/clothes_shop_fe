import { ProductVariant } from "./product"

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