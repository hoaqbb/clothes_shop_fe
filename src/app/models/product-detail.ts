import { ProductImage } from "./product-image"
import { ProductVariant } from "./product-variant"

export interface ProductDetail {
    name: string
    price: number
    description: string
    discount: number
    slug: string
    productImages: ProductImage[]
    productVariants: ProductVariant[]
  }