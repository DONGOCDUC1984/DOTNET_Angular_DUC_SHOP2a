import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Status } from 'src/app/models/status';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  myForm!: FormGroup;
  id!: number;
  // In the following line,if there is only "status!: Status"
  // without { statusCode: 0, message: '' },there will not be an error here .
  // Nevertheless,there will be an error somewhere else.
  status: Status = { statusCode: 0, message: '' };

  constructor(
    public service: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.FillForm();
  }
  private FillForm() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.service.GetById(this.id).subscribe({
        next: (res) => {
          this.myForm.patchValue(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, Validators.required),
    });
  }
  Submit() {
    this.status = { statusCode: 0, message: 'wait...' };
    this.service.isSpinner = true;
    // console.log(this.myForm);
    this.service.AddUpdate(this.myForm.value).subscribe({
      next: (res) => {
        // console.log(res);
        this.service.isSpinner = false;
        if (res.statusCode == 1) {
          this.status.statusCode = 1;
          this.router.navigate(['categories']);
          // Update
          if (this.id) {
            Swal.fire({
              title: 'Good job!',
              text: 'Successfully updated',
              icon: 'success',
            });
          }
          // Create
          else {
            Swal.fire({
              title: 'Good job!',
              text: 'Successfully created',
              icon: 'success',
            });
          }
          this.myForm.reset();
        } else {
          this.status = { statusCode: 0, message: 'Error' };
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
