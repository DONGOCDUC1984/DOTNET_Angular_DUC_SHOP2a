import { UserService } from 'src/app/service/user.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  constructor(
    private router: Router,
    public translateService: TranslateService,
    public userService: UserService,
    public productService: ProductService,
    public cartService: CartService
  ) {
    translateService.addLangs(['en', 'vi']);
    translateService.setDefaultLang('en');
  }

  ngDoCheck(): void {
    this.userService.CheckIsLoggedIn();
    this.userService.CheckIsAdmin();
  }

  ngOnInit() {
    this.userService.CheckIsLoggedIn();
    this.userService.CheckIsAdmin();
    if (this.userService.IsLoggedIn) {
      this.GetCartByUserId();
    }
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
  }
  GetCartByUserId() {
    this.cartService.GetCartByUserId(this.userService.UserId);
  }

  Search(categoryId: string, minPrice: string, maxPrice: string) {
    //this.router.navigate(['/products']);
    this.productService
      .Search('', Number(categoryId), 0, 0, Number(minPrice), Number(maxPrice))
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.productService.products = res as Product[];
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
