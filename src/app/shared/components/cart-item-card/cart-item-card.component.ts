import { Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { environment } from '../../../../environments/environment.development';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-cart-item-card',
  standalone: true,
  imports: [InputNumberModule],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css'
})
export class CartItemCardComponent {
  baseUrl = environment.apiUrl;
  @Input() cartItem?: CartItem;

  constructor(){
    console.log(this.cartItem);
    
  }

  // cartItems: CartItem[] = SeedCartItems.items

  // this.cartItems[0].color = ""
}
