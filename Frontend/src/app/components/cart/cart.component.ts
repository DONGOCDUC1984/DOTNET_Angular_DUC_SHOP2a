import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, DoCheck {
  myForm!: FormGroup;
  constructor(
    public cartService: CartService,
    public userService: UserService,
    public orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngDoCheck(): void {
    this.userService.CheckIsLoggedIn();
  }

  ngOnInit() {
    this.userService.CheckIsLoggedIn();
    if (this.userService.IsLoggedIn == true) {
      this.cartService.GetCartByUserId(this.userService.UserId);
    }
    this.myForm = this.formBuilder.group({
      id: [0],
      userTel: ['', Validators.required],
      userAddress: ['', Validators.required],
    });
  }

  AddCartItem(ProductId: number) {
    this.cartService.AddCartItem(this.userService.UserId, ProductId).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.cartService.cartLength = res.length;
        this.cartService.cart = res.cart;
        this.cartService.totalCost = res.totalCost;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  DecreaseCartItem(ProductId: number) {
    this.cartService
      .DecreaseCartItem(this.userService.UserId, ProductId)
      .subscribe({
        next: (res: any) => {
          //console.log(res);
          this.cartService.cartLength = res.length;
          this.cartService.cart = res.cart;
          this.cartService.totalCost = res.totalCost;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  RemoveCartItem(ProductId: number) {
    this.cartService
      .RemoveCartItem(this.userService.UserId, ProductId)
      .subscribe({
        next: (res: any) => {
          //console.log(res);
          this.cartService.cartLength = res.length;
          this.cartService.cart = res.cart;
          this.cartService.totalCost = res.totalCost;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  get f() {
    return this.myForm.controls;
  }
  Submit() {
    console.log(this.myForm.value);
    this.cartService.isSpinner = true;
    this.orderService
      .Add(
        this.userService.UserId,
        this.myForm.value.userTel,
        this.myForm.value.userAddress,
        this.cartService.totalCost
      )
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.cartService.isSpinner = false;
          Swal.fire({
            title: 'Good job!',
            text: 'Successfully ordered',
            icon: 'success',
          });

          // this.cartService.cartLength = 0;
          // this.cartService.GetCartByUserId(this.userService.UserId);
          // this.cartService.totalCost = 0;

          this.myForm.reset();
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        },
      });
  }
}
