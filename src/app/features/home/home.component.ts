import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from "../products/product-list/product-list.component";
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../models/product';
import { UserProductParams } from '../../models/userParams';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  productParams = new UserProductParams();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts(this.productParams).subscribe(
      res => this.products = res.result
    );
  }
}
