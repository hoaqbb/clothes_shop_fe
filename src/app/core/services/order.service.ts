import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { OrderRequest } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: OrderRequest) {
    return this.http.post<string>(this.baseUrl + '/api/Order/create-order', order, { responseType: 'text' as 'json' });
  }

  paymentCallback(queryParams: HttpParams) {
    return this.http.get(this.baseUrl + '/api/Order/payment-callback?', { params: queryParams });
  }
}
