import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { Status } from '../models/status';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = environment.apiBaseUrl + '/Category';
  message1 = '';
  isSpinner: boolean = false;
  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get(this.url);
  }
  GetById(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  AddUpdate(category: Category) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post<Status>(this.url, category, {
      headers: tokenHeader,
    });
  }
  Delete(id: number) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete<Status>(this.url + '/' + id, {
      headers: tokenHeader,
    });
  }
}
