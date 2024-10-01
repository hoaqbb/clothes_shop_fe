import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../../features/authentication/login/login.component';
import { RegisterComponent } from '../../../features/authentication/register/register.component';
import { CartSidebarComponent } from "../../../features/cart/cart-sidebar/cart-sidebar.component";
import { ButtonModule } from 'primeng/button';
import { AccountService } from '../../services/account.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, LoginComponent, RegisterComponent, CartSidebarComponent, ButtonModule, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  show: boolean = false;

  constructor(public accountService: AccountService) { }

  toggleSidebar() {
    this.show = !this.show;
  }

  onSidebarHide() {
    this.show = false;
  }
}
