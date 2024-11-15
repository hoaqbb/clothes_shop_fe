import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateProduct, Product, ProductVariant, UpdateProduct } from '../../models/product';
import { Order } from '../../models/order';
import { UserParams } from '../../models/userParams';
import { getPaginatedResult, getPaginationHeaders } from '../../shared/helpers/paginationHelpers';
import { Category } from '../../models/category';
import { Color } from '../../models/color';
import { Size } from '../../models/size';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  userParams: UserParams;
  categories = signal<Category[]>([]);
  colors = signal<Color[]>([]);
  sizes = signal<Size[]>([]);

  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  createProduct(product) {
    return this.http.post(
      this.baseUrl + '/api/Product/create-product',
      product
    );
  }

  updateProduct(updateProduct: UpdateProduct) {
    return this.http.put(this.baseUrl + '/api/Product/update-product', updateProduct)
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + '/api/Product/delete-product/' + id);
  }

  updateProductQuantity(id: number, quantityUpdate: ProductVariant[]) {
    return this.http.put(this.baseUrl + '/api/Product/update-product-quantity/' + id, quantityUpdate);
  }

  addProductImages(id, files) {
    return this.http.post(this.baseUrl + '/api/Product/add-product-images', {});
  }

  deleteProductImage(productId: number, imageId: number) {
    return this.http.delete(this.baseUrl + '/api/Product/delete-image/'+productId+'/'+imageId);
  }

  setMainImage(productId: number, imageId: number) {
    return this.http.put(this.baseUrl + '/api/Product/set-main-image/' + productId + '?imageId='+imageId, {});
  }

  setSubImage(productId: number, imageId: number) {
    return this.http.put(this.baseUrl + '/api/Product/set-sub-image/' + productId + '?imageId='+imageId, {});
  }

  updateProductStatus(id) {
    return this.http.put(this.baseUrl + '/api/Product/update-product-status/' + id, {});
  }

  updateStatusOrder(id) {
    return this.http.put(this.baseUrl + '/api/Order/update-status-order/' + id, {});
  }

  getAllOrder(userParams: UserParams) {
    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );
    return getPaginatedResult<Order[]>(
      this.baseUrl + '/api/Order/get-all-order',
      params,
      this.http
    );
  }

  getAllCategory() {
    return this.http.get(this.baseUrl + '/api/Category/get-all-category').pipe(
      map( (categories: Category[]) => {
        this.categories.set(categories);
      }, (error) => console.error('Failed to load categories', error))
    );
  }

  getAllColor() {
    return this.http.get(this.baseUrl + '/api/Color/get-all-color').pipe(
      map((colors: Color[]) => {
        this.colors.set(colors);
      }, (error) => console.error('Failed to load colors', error))
    );
  }

  getAllSize() {
    return this.http.get(this.baseUrl + '/api/Size/get-all-size').pipe(
      map( (sizes: Size[]) => {
        this.sizes.set(sizes);
      }, (error) => console.error('Failed to load sizes', error))
    );
  }
}
