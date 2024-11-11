import { Category } from "./category"

export interface Product {
    id: number
    name: string
    price: number
    mainPhoto: string
    subPhoto: string
    productColors: ProductColor[]
    discount: number
    slug: string
    isVisible: boolean
  }

export interface ProductDetail {
  id: number
  name: string
  price: number
  description: string
  discount: number
  slug: string
  category: Category
  productImages: ProductImage[]
  productVariants: ProductVariant[]
}

export interface ProductImage {
  id: number
  imageUrl: string
  isMain: boolean
  isSub: boolean
}

export interface ProductVariant {
  id: number
  amount: number
  color: string
  colorCode: string
  size: string
}

export interface ProductColor {
  name: string
  colorCode: string
}

export interface CreateProduct {
  name: string
  price: number
  description: string
  discount: number
  slug: string
  categoryId: number
  productColors: number[]
  productSizes: number[]
  mainImage: File
  subImage: File
  productImages: File[]
}

export interface UpdateProduct {
  id: number
  name: string
  price: number
  description: string
  discount: number
  slug: string
  categoryId: number
  productColors: number[]
  productSizes: number[]
  // productImages: File[]
}