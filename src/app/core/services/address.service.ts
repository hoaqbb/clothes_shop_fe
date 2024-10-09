import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  url = 'https://esgoo.net/api-tinhthanh/';
  provinces: any;

  constructor(private http: HttpClient) { }

  getProvinces() {
    return this.http.get(this.url + '1/0.htm');
  }

  getDistricts(provinceId: string) {
    return this.http.get(this.url + '2/' + provinceId + '.htm');
  }

  getWards(districtId: string) {
    return this.http.get(this.url + '3/' + districtId + '.htm');
  }

  getFullAddress(wardId: string) {
    return this.http.get(this.url + '5/' + wardId + '.htm');
  }
}
