import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../../models/user';
import { take } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  let currentUser: User;

  accountService.currentUser$.pipe(take(1)).subscribe( user => {
    currentUser = user;
  });

  if(currentUser) {
    if(currentUser.token) {
      let decodedToken = jwtDecode(currentUser.token);
      const isExpired = 
        decodedToken && decodedToken.exp ?
        decodedToken.exp < Date.now() / 1000
        : false;

      if(isExpired) {
        accountService.logout();
        router.navigateByUrl('account/login');
      } else {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        })
      }
    }
  }

  return next(req);
};
