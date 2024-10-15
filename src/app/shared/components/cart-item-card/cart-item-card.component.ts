import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { environment } from '../../../../environments/environment.development';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-item-card',
  standalone: true,
  imports: [InputNumberModule, FormsModule, NgIf],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css'
})
export class CartItemCardComponent {
  baseUrl = environment.apiUrl;
  @Input() cartItem: CartItem;
  @Output() calculate = new EventEmitter<boolean>();

  constructor(private cartService: CartService) {}

  removeCartItem(cartItemId: number) {
    this.cartService.removeCartItem(cartItemId).subscribe(() => {
      this.callCulateAmount();
    })
  }

  changeQuantityItem(variantId: number, quantity: number) {
    return this.cartService.addToCart(variantId, quantity).subscribe(()=> 
      this.callCulateAmount()
    );
  }

  callCulateAmount() {
    this.calculate.emit(true)
  }
}
