import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../../models/user';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  let currentUser: User;
  const excludedUrls = ['https://esgoo.net/api-tinhthanh'];
  const shouldExclude = excludedUrls.some(url => req.url.startsWith(url));

  accountService.currentUser$.pipe(take(1)).subscribe( user => {
    currentUser = user;
  });

  if (!shouldExclude) {
    if(currentUser) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
  }

  return next(req);
};
