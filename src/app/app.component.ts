import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { FooterComponent } from "./core/components/footer/footer.component";
import { AccountService } from './core/services/account.service';
import { User } from './models/user';
import { CartService } from './core/services/cart.service';
import { CartItem } from './models/cart';
import { CartSidebarComponent } from './features/cart/cart-sidebar/cart-sidebar.component';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    FooterComponent,
    CartSidebarComponent,
    CommonModule,
    AdminSidebarComponent,
    SplitterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnChanges {
  // cartItems: CartItem[] = [];
  @Input() show: boolean = false;
  isAdmin: boolean = false;
  role: String;

  constructor(
    private accountService: AccountService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.isAdmin = this.role === 'Admin';

    this.navigateBasedOnRole();
    // this.loadCart();
    // this.setCurrentCartItems();
  }

  toggleCartSidebar() {
    this.show = !this.show;
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUserSource(user);
    if (user) {
      this.role = this.accountService.getRoleFromToken(user.token);
      this.cartService.getUserCart().subscribe((response) => {
        this.cartService.cartItems = response;
      });
    }
  }

  loadCart() {}

  setCurrentCartItems() {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems'));
    this.cartService.setCurrentCartItemsSource(cartItems);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['role']) {
      this.cdr.detectChanges(); // Gọi detectChanges để cập nhật giao diện
    }
  }

  navigateBasedOnRole() {
    if (this.role === 'Admin') {
      this.isAdmin = true;
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.isAdmin = false;
      this.router.navigate(['/']);
    }
    this.cdr.detectChanges(); // Gọi detectChanges để cập nhật giao diện
  }
}
