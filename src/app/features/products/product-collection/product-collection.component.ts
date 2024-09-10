import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-collection',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './product-collection.component.html',
  styleUrl: './product-collection.component.css'
})
export class ProductCollectionComponent implements OnInit{
  products: Product[] = [];
  catName?: string | null;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catName = params.get('category');
      console.log(this.catName);
      this.getProductsByCategory();
    });
  }

  getProductsByCategory() {
    this.catName == null ? 
      this.productService.getProductsByCategory('all').subscribe(res =>
        this.products = res
      ) :
      this.productService.getProductsByCategory(this.catName).subscribe(res =>
        this.products = res
      )
  }

}
