import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent implements OnInit{

  queryParams = new HttpParams();

  constructor(
    private route: ActivatedRoute, 
    private orderService: OrderService, 
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: HttpParams) => {
      let httpParams = new HttpParams();
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
      // Gửi các tham số lên server
      this.sendParamsToServer(httpParams);
    });
  }
  
  // Hàm gửi tham số lên server
  sendParamsToServer(params: HttpParams) {
    return this.orderService.paymentCallback(params).subscribe((response: any) => {
      this.clearQueryParams();
      this.cartService.clearCart();
    });
  }
  
  clearQueryParams() {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  
}
