import { Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { CartService } from '../../../core/services/cart.service';
import { globalModules } from '../../global.modules';

@Component({
  selector: 'app-card-item-sidebar-card',
  standalone: true,
  imports: [globalModules],
  templateUrl: './card-item-sidebar-card.component.html',
  styleUrl: './card-item-sidebar-card.component.css'
})
export class CardItemSidebarCardComponent {
  @Input() cartItem: CartItem;

  constructor(private cartService: CartService) { }

  removeCartItem(cartItemId: number) {
    return this.cartService.removeCartItem(this.cartService.cart().id, cartItemId).subscribe(() => {

    })
  }
}
