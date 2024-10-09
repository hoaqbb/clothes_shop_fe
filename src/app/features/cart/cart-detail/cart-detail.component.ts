import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { CartItemCardComponent } from '../../../shared/components/cart-item-card/cart-item-card.component';
import { CartService } from '../../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CartItemCardComponent],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent implements OnInit{
  amount = 0;

  // items: CartItem[] = [];
  constructor(public cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.calculateAmount();
  }

  // getCartItems() {
  //   this.cartService.getUserCart().subscribe((items) => {
  //     this.items = items;

  //   })
  // }

  calculateAmount() {
    this.cartService.getUserCart().subscribe(res => {
      res.forEach(element => {
        if(element.discount) {
          this.amount += element.price*(100-element.discount)/100*element.quantity;
        } else {
          this.amount += element.quantity * element.price
        }
      });
    });
  return this.amount;
  }

  checkout() {
    this.router.navigateByUrl('/checkout')
  }

}
