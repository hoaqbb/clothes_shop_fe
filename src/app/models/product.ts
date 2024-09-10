import { ProductColor } from "./product-color"

export interface Product {
    name: string
    price: number
    mainPhoto: string
    subPhoto: string
    productColors: ProductColor[]
    discount: number
    slug: string
  }