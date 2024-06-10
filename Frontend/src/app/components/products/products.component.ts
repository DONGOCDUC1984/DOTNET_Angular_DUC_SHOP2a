import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { ProvinceCity } from 'src/app/models/provinceCity';
import { District } from 'src/app/models/district';
import { max } from 'rxjs';
import { ProductAddUpdateDTO } from 'src/app/models/productAddUpdateDTO';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: {
      id: 0,
      name: '',
    },
    district: {
      id: 0,
      name: '',
      provinceCity: {
        id: 0,
        name: '',
      },
    },
    imageUrl: '',
  };
  productAddUpdateDTO: ProductAddUpdateDTO = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    provinceCityId: 0,
    districtId: 0,
    imageUrl: '',
  };

  products: Product[] = [];
  isSpinner2: boolean = true;

  id!: number;
  name: string = '';
  description: string = '';
  price: number = 0;
  categoryId: number = 0;
  categoryName: string = '';
  provinceCityId: number = 0;
  provinceCityName: string = '';
  districtId: number = 0;
  districtName: string = '';
  imageUrl: string = '';
  response: any = { dbPath: '' };
  // categories: Category[] = [];
  //The above line is equivalent to the following line
  categories!: Category[];
  provinceCities!: ProvinceCity[];
  districts!: District[];
  selectedProvinceCity: ProvinceCity = {
    id: 0,
    name: '',
  };

  // Pagination:
  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;

  constructor(
    public categoryService: CategoryService,
    public productService: ProductService,
    public cartService: CartService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    // What is in ngOnInit , can be written in constructor with the same effect
    this.GetAll();
    this.isSpinner2 = false;
    this.GetAllCategories();
    this.GetAllProvinceCities();
    this.OnSelectProvinceCity(this.selectedProvinceCity.id.toString());
  }

  GetAll() {
    this.productService.GetAll().subscribe({
      next: (res) => {
        // console.log(res);
        this.productService.products = res as Product[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  Search(
    searchStr: string,
    categoryId: string,
    provinceCityId: string,
    districtId: string,
    minPrice: string,
    maxPrice: string
  ) {
    this.productService
      .Search(
        searchStr,
        Number(categoryId),
        Number(provinceCityId),
        Number(districtId),
        Number(minPrice),
        Number(maxPrice)
      )
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.productService.products = res as Product[];
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  GetById(id: number) {
    this.productService.GetById(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.product = res as Product;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  Edit(id: number) {
    this.id = id;
    this.FillForm();
    this.productService.GetById(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.product = res as Product;
        // console.log(this.product);
        this.selectedProvinceCity.id = this.product.district.provinceCity.id;
        this.OnSelectProvinceCity(this.selectedProvinceCity.id.toString());
      },
      error: (err) => {
        console.log(err);
      },
    });
    // If I write here  the following 4 lines, the program will not work well
    // this.GetById(id);
    // console.log(this.product);
    // this.selectedProvinceCity.id = this.product.provinceCityId;
    // this.OnSelectProvinceCity(this.selectedProvinceCity.id.toString());
  }

  SeeDetails(id: number) {
    this.id = id;
    this.productService.isSpinner = true;
    this.productService.GetById(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.product = res as Product;
        this.productService.isSpinner = false;
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
        this.productService.isSpinner = true;
        this.productService.Delete(id).subscribe({
          next: (res) => {
            this.productService.products = res as Product[];
            // console.log(res);
            this.productService.isSpinner = false;
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
  ReSetForm() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.price = 0;
    this.categoryId = 0;
    this.categoryName = '';
    this.provinceCityId = 0;
    this.provinceCityName = '';
    this.districtId = 0;
    this.districtName = '';
    this.imageUrl = '';
  }
  private FillForm() {
    if (this.id > 0) {
      this.productService.GetById(this.id).subscribe({
        next: (res: any) => {
          console.log(res);
          this.id = res.id;
          this.name = res.name;
          this.description = res.description;
          this.price = res.price;
          this.categoryId = res.categoryId;
          this.categoryName = res.categoryName;
          this.provinceCityId = res.provinceCityId;
          this.provinceCityName = res.provinceCityName;
          this.districtId = res.districtId;
          this.districtName = res.districtName;
          this.imageUrl = res.imageUrl;
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

  Submit() {
    this.productService.isSpinner = true;

    this.productAddUpdateDTO = {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      categoryId: this.categoryId,
      provinceCityId: this.provinceCityId,
      districtId: this.districtId,
      imageUrl: this.response.dbPath,
    };
    // console.log(this.product);
    this.productService.AddUpdate(this.productAddUpdateDTO).subscribe({
      next: (res) => {
        // console.log(res);
        this.productService.products = res as Product[];
        this.productService.isSpinner = false;
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
        this.ReSetForm();
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

  // Get ALll Province_cities:
  GetAllProvinceCities() {
    this.productService.GetAllProvinceCities().subscribe({
      next: (res) => {
        // console.log(res);
        this.provinceCities = res as ProvinceCity[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Get ALll Districts:
  GetAllDistricts() {
    this.productService.GetAllDistricts().subscribe({
      next: (res) => {
        // console.log(res);
        this.districts = res as District[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  OnSelectProvinceCity(x: string) {
    // console.log('selectedProvinceCity.id=' + x);
    this.productService.GetAllDistricts().subscribe({
      next: (res) => {
        this.selectedProvinceCity.id = Number(x);
        this.districts = res as District[];
        // console.log(this.districts);
        this.districts = this.districts.filter(
          (d) => d.provinceCity.id == Number(x)
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  uploadFinished(event: any) {
    this.response = event;
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
}
