import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CartItem } from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  cartItems: any[] = [];

  constructor() { }

  addToCart(product: any) {
    // Add item to cart
    this.cartItems.push(product)
  }
}
