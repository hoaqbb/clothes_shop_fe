import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDetail } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl + '/api/Product');
  }

  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(this.baseUrl + '/api/Product/categories/' + category);
  }

  getProductBySlug(slug: string) {
    return this.http.get<ProductDetail>(this.baseUrl + '/api/Product/'+ slug);
  }

}
