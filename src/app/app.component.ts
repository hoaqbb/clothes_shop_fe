import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { FooterComponent } from "./core/components/footer/footer.component";
import { AccountService } from './core/services/account.service';
import { User } from './models/user';
import { CartService } from './core/services/cart.service';
import { CartItem } from './models/cart';
import { CartSidebarComponent } from './features/cart/cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, CartSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  // cartItems: CartItem[] = [];
  @Input() show: boolean = false;

  constructor(private accountService: AccountService, private cartService: CartService) { }

  ngOnInit(): void {
    this.setCurrentUser();
    // this.loadCart();
    // this.setCurrentCartItems();
  }

  toggleCartSidebar() {
    this.show = !this.show;
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUserSource(user);
    if(user) {
      this.cartService.getUserCart().subscribe(response => {
        this.cartService.cartItems = response;
      })
    }
  }

  loadCart() {
    
  }

  setCurrentCartItems() {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems'));
    this.cartService.setCurrentCartItemsSource(cartItems);
  }
}
