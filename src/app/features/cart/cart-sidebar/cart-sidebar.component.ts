import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarModule } from 'primeng/sidebar'; 
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CartItem } from '../../../models/cart';
import { CardItemSidebarCardComponent } from '../../../shared/components/card-item-sidebar-card/card-item-sidebar-card.component';
import { CartService } from '../../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule, FormsModule, SidebarModule, 
    ScrollPanelModule, CardItemSidebarCardComponent,
    RouterLink
  ],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent implements OnInit{
  events: string[] = [];

  @Input() show!: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  // cartItems: CartItem[] = [];

  constructor(public cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    // this.getCartItems();
  }

  onHide() {
    this.showChange.emit(false);
  }

  checkout() {
    this.router.navigateByUrl('/checkout')
  }

  // getCartItems() {
  //   this.cartService.getUserCart().subscribe((items) => {
  //     this.cartItems = items;
  //   })
  // }
}
