import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-left-offcanvas',
  templateUrl: './left-offcanvas.component.html',
  styleUrls: ['./left-offcanvas.component.css'],
})
export class LeftOffcanvasComponent {
  constructor(public productService: ProductService) {}
}
