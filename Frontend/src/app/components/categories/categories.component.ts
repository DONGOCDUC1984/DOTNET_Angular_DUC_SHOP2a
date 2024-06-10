import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  // categories: Category[] = [];
  //The above line is equivalent to the following line
  categories!: Category[];
  isSpinner2!: boolean;
  constructor(public service: CategoryService, private router: Router) {
    this.isSpinner2 = true;
  }
  ngOnInit(): void {
    this.GetAll();
    this.isSpinner2 = false;
  }

  GetAll() {
    this.service.GetAll().subscribe({
      next: (res) => {
        // console.log(res);
        this.categories = res as Category[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  Edit(id: number) {
    this.router.navigate(['update-category/' + id]);
  }
  Delete(id: number, i: number) {
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
        this.service.Delete(id).subscribe({
          next: (res) => {
            console.log(res);
            this.service.isSpinner = false;
            if (res.statusCode == 1) {
              this.categories.splice(i, 1);
              Swal.fire({
                title: 'Good job!',
                text: 'Successfully deleted',
                icon: 'success',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              });
            }
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
