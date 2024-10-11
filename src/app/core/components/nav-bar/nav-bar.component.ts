import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, Renderer2 } from '@angular/core';
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
export class NavBarComponent implements AfterViewInit{
  @Output() toggleCartSideBar = new EventEmitter<void>();
  renderer: Renderer2;

  constructor(public accountService: AccountService) { }

  @ViewChild('myElement') myElement: ElementRef;
  @HostListener('window:scroll', [])
  
  ngAfterViewInit(): void {
    // if(window.pageYOffset > 50){ // Điều kiện cuộn
    //   this.renderer.addClass(this.myElement.nativeElement, 'nav-scroll');
    // }else{
    //     this.renderer.removeClass(this.myElement.nativeElement, 'nav-scroll');
    // }
  }

  toggleSidebar() {
    this.toggleCartSideBar.emit();
  }
}
