import { Component, OnInit, DoCheck } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  orders: any;
  constructor(
    public userService: UserService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.GetOrdersByUserId();
  }

  GetOrdersByUserId() {
    this.orderService.GetOrdersByUserId(this.userService.UserId).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.orders = res;
        console.log(this.orders);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
