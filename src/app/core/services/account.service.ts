import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';
import { User, UserDetail } from '../../models/user';
import { CartService } from './cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();

  ///////
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private cartService: CartService) {}

  getRoleFromToken(token: string): string {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return (
      decodedToken['role'] ||
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ]
    );
  }

  login(model: any) {
    return this.http.post(this.baseUrl + '/api/Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUserSource(user);
          this.cartService.getUserCart().subscribe((response) => {
            this.cartService.cartItems = response;
          });
          // this.cartService.getUserCart().subscribe((response) => {
          //   this.cartService.setCurrentCartItemsSource(response);
          // });
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
    this.cartService.cartItems = [];
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
