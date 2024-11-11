import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarModule } from 'primeng/sidebar'; 
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardItemSidebarCardComponent } from '../../../shared/components/card-item-sidebar-card/card-item-sidebar-card.component';
import { CartService } from '../../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { globalModules } from '../../../shared/global.modules';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule, FormsModule, SidebarModule, 
    ScrollPanelModule, CardItemSidebarCardComponent,
    RouterLink, globalModules
  ],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent implements OnInit{
  events: string[] = [];

  @Input() show!: boolean;
  @Output() showChange = new EventEmitter<boolean>();

  constructor(public cartService: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  onHide() {
    this.showChange.emit(false);
  }

  checkout() {
    this.router.navigateByUrl('/checkout')
  }

}
