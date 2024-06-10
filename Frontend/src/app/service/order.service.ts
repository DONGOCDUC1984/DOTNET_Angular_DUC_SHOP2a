import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.apiBaseUrl + '/order';
  message1 = '';
  isSpinner: boolean = false;
  constructor(private http: HttpClient) {}
  Add(userId: string, userTel: string, userAddress: string, totalCost: number) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      this.url +
        '/add' +
        '?userId=' +
        userId +
        '&userTel=' +
        userTel +
        '&userAddress=' +
        userAddress +
        '&totalCost=' +
        totalCost,
      {
        headers: tokenHeader,
      }
    );
  }
  GetOrdersByUserId(userId: string) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(this.url + '/' + userId, {
      headers: tokenHeader,
    });
  }
  GetAllOrders() {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(this.url + '/GetAllOrders', {
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
}
