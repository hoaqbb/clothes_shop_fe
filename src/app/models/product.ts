
export interface Product {
    name: string
    price: number
    mainPhoto: string
    subPhoto: string
    productColors: ProductColor[]
    discount: number
    slug: string
  }

export interface ProductDetail {
  name: string
  price: number
  description: string
  discount: number
  slug: string
  productImages: ProductImage[]
  productVariants: ProductVariant[]
}

export interface ProductImage {
  imageUrl: string
}

export interface ProductVariant {
  amount: number
  color: string
  colorCode: string
  size: string
}

export interface ProductColor {
  name: string
  colorCode: string
}