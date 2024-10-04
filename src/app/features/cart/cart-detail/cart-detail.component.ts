import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { SeedCartItems } from '../../../models/seed-data-cart-items';
import { CartItemCardComponent } from '../../../shared/components/cart-item-card/cart-item-card.component';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CartItemCardComponent],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent implements OnInit{
  // cartItems: CartItem[] = SeedCartItems.items;

  items: CartItem[] = [];
  constructor(private cartService: CartService) {
    
  }
  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getUserCart().subscribe((items) => {
      this.items = items;

    })
  }

}
