import { computed, effect, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Cart, CreateCart } from '../../models/cart';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { DiscountPrice } from '../../shared/helpers/productHelpers';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  cart = signal<Cart | null>(null);
  private CartIdSource = new BehaviorSubject<string>(null);
  CartId$ = this.CartIdSource.asObservable();
  count = signal<number>(0);
  amount = signal<number>(0);

  constructor(private http: HttpClient) { }

  getCart(cartId?) {
    if(cartId) {
      return this.http.get<Cart>(this.baseUrl + '/api/Cart/get-cart?cartId='+cartId).pipe(
        tap( cart => {
            this.cart.set(cart);
            this.itemCount();
            this.calculateAmount();
        })
      )
    }
    return this.http.get<Cart>(this.baseUrl + '/api/Cart/get-cart').pipe(
      tap( cart => {
          this.cart.set(cart);
          this.itemCount();
          this.calculateAmount();
      })
    )
  }

  addToCart(variantId: number, cartId: string) {
    return this.http.post(this.baseUrl + '/api/Cart/add-to-cart', {cartId: cartId, quantityId: variantId});
  }

  updateCartItem(cartId: string, cartItemId: number, quantity: number) {
    return this.http.put(this.baseUrl + '/api/Cart/update-cart-item', { cartId: cartId, cartItemId: cartItemId, quantity: quantity }).pipe(
      tap(() => {
        //van de nam o no up theo cai ng model luon, nen se kho bat dc gia tri thay doi
        // this.calculateAmount();
      })
    );
  }

  removeCartItem(cartId: string, cartItemId: number){
    let param = new HttpParams().set('cartItemId', cartItemId);
    return this.http.delete(this.baseUrl + '/api/Cart/remove-cart-item/' + cartId, { params: param }).pipe(
      map(() => {
        this.cart.update(cart => {
          cart.cartItems = cart.cartItems.filter(item => item.id !== cartItemId);
          this.itemCount();
          this.calculateAmount()
          return cart;
        });
      })
    )
  }

  createCart() {
    const cart = new CreateCart();
    this.setCurrentCartIdSource(cart.id);
    this.cart.set(cart);
  }

  itemCount(){
    let itemCount = computed(() => {
      return this.cart()?.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    })
    this.count.set(itemCount())
  }

  calculateAmount() {
    let calculate = computed(() => {
      return this.cart()?.cartItems.reduce((amount, item) => {
        if(item.discount > 0) {
          amount += item.price * item.quantity * (1 - item.discount / 100);
        }
        else {
          amount += item.price * item.quantity;
        }
        
        return amount;
      }, 0)
    })
    this.amount.set(calculate());
  }

  clearCart() {
    this.cart.set(null);
    this.count.set(0);
    this.amount.set(0);
  }

  setCurrentCartIdSource(cartId: string) {
    this.CartIdSource.next(cartId);
    localStorage.setItem('cart_id', JSON.stringify(cartId));
  }

  removeCartIdSource() {
    this.CartIdSource.next(null);
    localStorage.removeItem('cart_id');
  }
}
