import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(public productService: ProductService) {}
  @Input()
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
}
