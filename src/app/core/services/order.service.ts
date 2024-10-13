import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Order, OrderDetail, OrderRequest } from '../../models/order';
import { UserParams } from '../../models/userParams';
import { getPaginatedResult, getPaginationHeaders } from '../../shared/helpers/paginationHelpers';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;
  userParams: UserParams;

  constructor(private http: HttpClient) { 
    this.userParams = new UserParams();
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  getUserOrders(userParams: UserParams) {
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    return getPaginatedResult<Order[]>(this.baseUrl + '/api/Order/get-user-orders', params, this.http);
    // return this.http.get<Order[]>(this.baseUrl + '/api/Order/get-user-orders');
  }

  getOrderDetail(orderId) {
    return this.http.get<OrderDetail>(this.baseUrl + '/api/Order/get-order-detail/' + orderId);
  }

  createOrder(order: OrderRequest) {
    return this.http.post(this.baseUrl + '/api/Order/create-order', order, { responseType: 'text' as 'json' });
  }

  createPayPalOrder(order, id: string) {

    const orderRequest = {
      orderRequestDto: order,
      transactionId: id
    };
    
    return this.http.post(this.baseUrl + '/api/Order/create-paypal-order', orderRequest);
  }

  paymentCallback(queryParams: HttpParams) {
    return this.http.get(this.baseUrl + '/api/Order/payment-callback?', { params: queryParams });
  }
}
