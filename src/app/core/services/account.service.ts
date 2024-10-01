import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + '/api/Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          this.setCurrentUserSource(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + '/api/Account/register', model).pipe(
      map((user: User) => {
        if(user){
          this.setCurrentUserSource(user);
        }
        return user;
      })
    )
  }

  setCurrentUserSource(user: User) {
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
