import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarModule } from 'primeng/sidebar'; 
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CartItem } from '../../../models/cart';
import { SeedCartItems } from '../../../models/seed-data-cart-items';
import { CardItemSidebarCardComponent } from '../../../shared/components/card-item-sidebar-card/card-item-sidebar-card.component';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule, FormsModule, SidebarModule, 
    ScrollPanelModule, CardItemSidebarCardComponent
  ],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent {
  events: string[] = [];

  @Input() show!: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  cartItems: CartItem[] = SeedCartItems.items;

  onHide() {
    this.showChange.emit(false);
  }
}
