import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent {
  orders: any;
  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.GetAllOrders();
  }

  GetAllOrders() {
    this.orderService.GetAllOrders().subscribe({
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

  Delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.Delete(id).subscribe({
          next: (res: any) => {
            //console.log(res);
            this.orders = res;
            console.log(this.orders);
            Swal.fire({
              title: 'Good job!',
              text: 'Successfully deleted',
              icon: 'success',
            });
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
    });
  }
}
