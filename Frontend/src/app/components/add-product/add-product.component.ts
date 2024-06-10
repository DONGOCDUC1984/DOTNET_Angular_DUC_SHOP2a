import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Status } from 'src/app/models/status';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  myForm!: FormGroup;
  id!: number;
  // In the following line,if there is only "status!: Status"
  // without { statusCode: 0, message: '' },there will not be an error here .
  // Nevertheless,there will be an error somewhere else.
  status: Status = { statusCode: 0, message: '' };
  // categories: Category[] = [];
  //The above line is equivalent to the following line
  categories!: Category[];

  constructor(
    public categoryService: CategoryService,
    public productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.FillForm();
    this.GetAllCategories();
  }
  private FillForm() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.productService.GetById(this.id).subscribe({
        next: (res) => {
          this.myForm.patchValue(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  private GetAllCategories() {
    this.categoryService.GetAll().subscribe({
      next: (res) => {
        this.categories = res as Category[];
        // console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      categoryId: [0, Validators.required],
      price: [0, Validators.required],
    });
  }
  get f() {
    return this.myForm.controls;
  }
  Submit() {
    this.status = { statusCode: 0, message: 'wait...' };
    this.productService.isSpinner = true;
    console.log(this.myForm);
    this.productService.AddUpdate(this.myForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.productService.isSpinner = false;
        if (res.statusCode == 1) {
          this.status.statusCode = 1;
          this.router.navigate(['products']);
          // Update
          if (this.id) {
            this.productService.message1 = 'Successfully updated';
          }
          // Create
          else {
            this.productService.message1 = 'Successfully created';
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
