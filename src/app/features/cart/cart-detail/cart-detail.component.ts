import { Component } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { SeedCartItems } from '../../../models/seed-data-cart-items';
import { CartItemCardComponent } from '../../../shared/components/cart-item-card/cart-item-card.component';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CartItemCardComponent],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent {
  // cartItems: CartItem[] = SeedCartItems.items;

  items: CartItem[] = [
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
  constructor() {
    console.log(this.items); // Kiểm tra xem dữ liệu có được gán đúng không
  }
}
