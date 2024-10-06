import { Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { environment } from '../../../../environments/environment.development';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item-card',
  standalone: true,
  imports: [InputNumberModule, FormsModule],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css'
})
export class CartItemCardComponent {
  baseUrl = environment.apiUrl;
  @Input() cartItem: CartItem;

  constructor(private cartService: CartService){
    console.log(this.cartItem);
  }

  removeCartItem(cartItemId: number) {
    this.cartService.removeCartItem(cartItemId).subscribe(() => {
      console.log('cart-detail');
    })
  }

  changeQuantityItem(variantId: number, quantity: number) {
    return this.cartService.addToCart(variantId, quantity).subscribe(()=> 
    console.log('test')

    );
  }
}
