import { SizeColor } from "./size"

export interface Color {
    name: string
    colorCode: string
}

export interface ColorVariant {
    color: string
    colorCode: string
    variants?: SizeColor[]
}