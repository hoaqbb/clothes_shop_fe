import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { FooterComponent } from "./core/components/footer/footer.component";
import { AccountService } from './core/services/account.service';
import { User } from './models/user';
import { CartService } from './core/services/cart.service';
import { CartSidebarComponent } from './features/cart/cart-sidebar/cart-sidebar.component';
import { CommonModule } from '@angular/common';
import { SearchSidebarComponent } from './features/products/search-sidebar/search-sidebar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    FooterComponent,
    CartSidebarComponent,
    SearchSidebarComponent,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @Input() showCartSidebar: boolean = false;
  @Input() showSearchCpn: boolean = false;

  constructor(
    public accountService: AccountService,
    private cartService: CartService,
    private router: Router
  ) { }

  isHiddenRoute(): boolean {
    const hiddenRoutes = ['/admin', '/checkout'];
    return hiddenRoutes.some(route => this.router.url.startsWith(route));
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  toggleCartSidebar() {
    this.showCartSidebar = !this.showCartSidebar;
  }

  toggleSearch() {
    this.showSearchCpn = !this.showSearchCpn;
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if(user) {
      this.accountService.setCurrentUserSource(user);
      return this.cartService.getCart().subscribe(response => {

        this.cartService.setCurrentCartIdSource(response.id);
      })
    }

    return this.setCurrentCartId();
  }

  setCurrentCartId() {
    const cartId: string = JSON.parse(localStorage.getItem('cart_id'));
    
    if(cartId) {
      this.cartService.setCurrentCartIdSource(cartId);
      this.cartService.getCart(cartId).subscribe(response => {
        this.cartService.cart.set(response);
      })
    } 
  }

}
