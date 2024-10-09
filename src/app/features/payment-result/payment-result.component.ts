import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent implements OnInit{

  queryParams = new HttpParams();

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

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
      console.table(response);
      this.clearQueryParams();
    });
  }
  
  clearQueryParams() {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  
}
