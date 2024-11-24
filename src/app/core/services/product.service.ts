import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDetail } from '../../models/product';
import { UserProductParams } from '../../models/userParams';
import { getPaginatedResult, getPaginationHeaders } from '../../shared/helpers/paginationHelpers';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  productParams: UserProductParams;

  constructor(private http: HttpClient) { 
    this.productParams = new UserProductParams();
  }

  getUserParams() {
    return this.productParams;
  }

  setUserParams(params: UserProductParams) {
    this.productParams = params;
  }

  getAllProducts(userParams: UserProductParams) {
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('category', userParams.category)
    params = params.append('sortBy', userParams.sortBy)
    
    return getPaginatedResult<Product[]>(this.baseUrl + '/api/Product', params, this.http);
  }

  getProductBySlug(slug: string) {
    return this.http.get<ProductDetail>(this.baseUrl + '/api/Product/'+ slug);
  }

}
