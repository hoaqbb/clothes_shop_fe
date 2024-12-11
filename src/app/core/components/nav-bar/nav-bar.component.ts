import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, Renderer2, ViewChild, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../../features/authentication/login/login.component';
import { RegisterComponent } from '../../../features/authentication/register/register.component';
import { CartSidebarComponent } from "../../../features/cart/cart-sidebar/cart-sidebar.component";
import { ButtonModule } from 'primeng/button';
import { AccountService } from '../../services/account.service';
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CartSidebarComponent, ButtonModule, AsyncPipe, FontAwesomeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements AfterViewInit{
  @Output() toggleCartSideBar = new EventEmitter<void>();
  @Output() toggleSearchCpn = new EventEmitter<void>();
  faEye = faEye;

  constructor(public accountService: AccountService, public cartService: CartService, private renderer: Renderer2) { }

  @ViewChild('myElement') myElement: ElementRef;
  @HostListener('window:scroll', [])
  ngAfterViewInit(): void {
    if(window.pageYOffset > 50){ // Điều kiện cuộn
      this.renderer.addClass(this.myElement.nativeElement, 'nav-scroll');
    }else{
        this.renderer.removeClass(this.myElement.nativeElement, 'nav-scroll');
    }
  }

  toggleSidebar() {
    this.toggleCartSideBar.emit();
  }

  toggleSearch() {
    this.toggleSearchCpn.emit();
  }
}