import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, map } from 'rxjs';
import { User, UserDetail } from '../../models/user';
import { CartService } from './cart.service';
import { Cart } from '../../models/cart';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) {}

  login(model: any) {
    return this.http.post(this.baseUrl + '/api/Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUserSource(user);
          this.cartService.getCart().subscribe((cart: Cart) => {
            // this.cartService.cart.set(cart);
            this.cartService.itemCount();
            this.cartService.setCurrentCartIdSource(cart.id);
          });
        }
        return response;
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + '/api/Account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUserSource(user);
        }
        return user;
      })
    );
  }

  getUserDetail() {
    return this.http.get<UserDetail>(
      this.baseUrl + '/api/Account/get-user-detail'
    );
  }

  setCurrentUserSource(user: User) {
    user.role ='';
    const role = this.getDecodedToken(user.token).role
    if(role != '') user.role = role;
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.cartService.removeCartIdSource();
    this.cartService.clearCart();
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
