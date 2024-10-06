import { CartItem, CartItemTest } from "./cart";

export class SeedCartItems {
    public static items: CartItemTest[] = [
        {
            name: 'HADES STRIPED SOLID SHIRT',
            price: 480000,
            photo: "/product-image/ao1_1.webp",
            discount: 10,
            color: "XANH",
            colorCode: "#055b26",
            size: "S",
            quantity: 1,
            slug: 'hades-striped-shirt'
        },
        {
            name: 'HADES LOVELESS STRIPED SHIRT',
            price: 520000,
            photo: "/product-image/ao2_1.webp",
            discount: 20,
            color: "XÁM",
            colorCode: "#949494",
            size: "L",
            quantity: 1,
            slug: 'hades-loveloss-striped-shirts'
        },
        {
            name: 'HADES STRIPED SOLID SHIRT',
            price: 480000,
            photo: "/product-image/ao1_1.webp",
            discount: 10,
            color: "XANH",
            colorCode: "#055b26",
            size: "M",
            quantity: 2,
            slug: 'hades-striped-shirt'
        }
    ]
}