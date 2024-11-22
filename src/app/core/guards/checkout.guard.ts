import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const toastr = inject(ToastrService);

  if(cartService.cart() && cartService.cart().cartItems.length > 0) {
    return true;
  }

  toastr.info('Giỏ hàng bạn đang trống, vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
  return false;
};
