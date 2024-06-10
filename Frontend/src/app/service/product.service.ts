import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductAddUpdateDTO } from '../models/productAddUpdateDTO';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.apiBaseUrl + '/Product';
  message1 = '';
  isSpinner: boolean = false;
  products: Product[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  GetAll() {
    return this.http.get(this.url);
  }
  Search(
    searchStr: string,
    categoryId: number,
    provinceCityId: number,
    districtId: number,
    minPrice: number,
    maxPrice: number
  ) {
    return this.http.get(
      this.url +
        '?searchStr=' +
        searchStr +
        '&categoryId=' +
        categoryId +
        '&provinceCityId=' +
        provinceCityId +
        '&districtId=' +
        districtId +
        '&minPrice=' +
        minPrice +
        '&maxPrice=' +
        maxPrice
    );
  }
  GetById(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  AddUpdate(productAddUpdateDTO: ProductAddUpdateDTO) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(this.url, productAddUpdateDTO, {
      headers: tokenHeader,
    });
  }

  Delete(id: number) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete(this.url + '/' + id, {
      headers: tokenHeader,
    });
  }
  // Get ALll Province_cities:
  GetAllProvinceCities() {
    return this.http.get(environment.apiBaseUrl + '/ProvinceCity');
  }

  // Get ALll Districts:
  GetAllDistricts() {
    return this.http.get(environment.apiBaseUrl + '/District');
  }
  CreateImageUrl(Url: string) {
    return environment.baseUrl + '/' + Url;
  }
}
