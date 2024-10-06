import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const acountService = inject(AccountService);
  const router = inject(Router);
  
  return acountService.currentUser$.pipe(
    map(user => {
      if(user) 
        return true;
      else {
        router.navigateByUrl('/'); 
        return false;
      }
    })
  )
};
