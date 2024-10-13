import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CartItem } from '../../models/cart';
import { HttpClient } from '@angular/common/http';
import { map, of, ReplaySubject, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  cartItems: CartItem[] = [];
  private CartItemsSource = new ReplaySubject<CartItem[]>(1);
  CartItems$ = this.CartItemsSource.asObservable();

  constructor(private http: HttpClient, private toartr: ToastrService) { }

  getUserCart() {
    return this.http.get<CartItem[]>(this.baseUrl + '/api/Cart/get-user-cart')
  }

  addToCart(variantId: number, quantity?: number) {
    // Add item to cart
    if(quantity){
      return this.http.post(this.baseUrl + '/api/Cart/add-to-cart', {quantityId: variantId, quantity})
    }
      return this.http.post(this.baseUrl + '/api/Cart/add-to-cart', {quantityId: variantId});
    
  }

  removeCartItem(cartItemId: number) {
    return this.http.delete(this.baseUrl + '/api/Cart/remove-cart-item/' + cartItemId).pipe(
      map(() => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
      })
    );
  }

  clearCart() {
    return this.cartItems = [];
  }

  setCurrentCartItemsSource(cartItems: CartItem[]) {
    this.CartItemsSource.next(cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}
