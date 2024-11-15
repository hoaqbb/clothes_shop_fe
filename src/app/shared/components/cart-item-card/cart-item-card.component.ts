import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { environment } from '../../../../environments/environment.development';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { globalModules } from '../../global.modules';

@Component({
  selector: 'app-cart-item-card',
  standalone: true,
  imports: [InputNumberModule, FormsModule, globalModules],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css'
})
export class CartItemCardComponent {
  baseUrl = environment.apiUrl;
  @Input() cartItem: CartItem;
  cartId: string;
  itemQuantity: number;

  constructor(private cartService: CartService) {
    this.cartId = this.cartService.cart().id;
  }

  removeCartItem(cartItemId: number) {
    this.cartService.removeCartItem(this.cartId, cartItemId).subscribe(() => {
        // this.callCulateAmount();
      })
  }

  updateCartItem(event, cartItemId) {
    const newQuantity = event.target.ariaValueNow;

    return this.cartService.updateCartItem(this.cartId, cartItemId, newQuantity).subscribe(() => {

    })
    
  }

}
