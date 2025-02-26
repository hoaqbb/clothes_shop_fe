import { Component, OnInit } from '@angular/core';
import { CartItemCardComponent } from '../../../shared/components/cart-item-card/cart-item-card.component';
import { CartService } from '../../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { globalModules } from '../../../shared/global.modules';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CartItemCardComponent, globalModules],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent implements OnInit{

  constructor(public cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    
  }

  checkout() {
    this.router.navigateByUrl('/checkout')
  }

}
