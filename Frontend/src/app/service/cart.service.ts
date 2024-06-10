import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url = environment.apiBaseUrl + '/cart';
  message1 = '';
  isSpinner: boolean = false;
  cart: any;
  cartLength: number = 0;
  totalCost = 0;

  constructor(private http: HttpClient) {}
  GetCartByUserId(UserId: string) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http
      .get(this.url + '/' + UserId, {
        headers: tokenHeader,
      })
      .subscribe({
        next: (res: any) => {
          this.cartLength = res.length;
          this.cart = res.cart;
          this.totalCost = res.totalCost;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  AddCartItem(UserId: string, ProductId: number) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      this.url +
        '/AddCartItem' +
        '?UserId=' +
        UserId +
        '&ProductId=' +
        ProductId,
      {
        headers: tokenHeader,
      }
    );
  }
  DecreaseCartItem(UserId: string, ProductId: number) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(
      this.url +
        '/DecreaseCartItem' +
        '?UserId=' +
        UserId +
        '&ProductId=' +
        ProductId,
      {
        headers: tokenHeader,
      }
    );
  }
  RemoveCartItem(UserId: string, ProductId: number) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete(
      this.url +
        '/RemoveCartItem' +
        '?UserId=' +
        UserId +
        '&ProductId=' +
        ProductId,
      {
        headers: tokenHeader,
      }
    );
  }
}
