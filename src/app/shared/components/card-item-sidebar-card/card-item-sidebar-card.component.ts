import { Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-card-item-sidebar-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-item-sidebar-card.component.html',
  styleUrl: './card-item-sidebar-card.component.css'
})
export class CardItemSidebarCardComponent {
  @Input() cartItem: CartItem;

  constructor(private cartService: CartService) { }

  removeCartItem(cartItemId: number) {
    return this.cartService.removeCartItem(cartItemId).subscribe(() => 
    console.log('remove')
    )
  }
}
