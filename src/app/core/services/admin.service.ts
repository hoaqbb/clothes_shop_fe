import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCategory() {
    return this.http.get(this.baseUrl + '/api/Category/get-all-category');
  }

  getAllColor() {
    return this.http.get(this.baseUrl + '/api/Color/get-all-color');
  }

  getAllSize() {
    return this.http.get(this.baseUrl + '/api/Size/get-all-size');
  }
}
