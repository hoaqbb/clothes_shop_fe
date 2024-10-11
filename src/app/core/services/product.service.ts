import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDetail } from '../../models/product';
import { UserParams } from '../../models/userParams';
import { getPaginatedResult, getPaginationHeaders } from '../../shared/helpers/paginationHelpers';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  userParams = new UserParams();

  constructor(private http: HttpClient) { }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl + '/api/Product');
  }

  getProductsByCategory(userParams: UserParams, category: string) {
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('sortBy', userParams.sortBy)
    
    return getPaginatedResult<Product[]>(this.baseUrl + '/api/Product/categories/' + category, params, this.http)
  }

  getProductBySlug(slug: string) {
    return this.http.get<ProductDetail>(this.baseUrl + '/api/Product/'+ slug);
  }

}
