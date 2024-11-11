import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { UserParams } from '../../../models/userParams';
import { PaginatorModule } from 'primeng/paginator';
import { Pagination } from '../../../models/pagination';
import { SelectInputComponent } from "../../../shared/components/select-input/select-input.component";

@Component({
  selector: 'app-product-collection',
  standalone: true,
  imports: [ProductListComponent, FormsModule, PaginatorModule, SelectInputComponent],
  templateUrl: './product-collection.component.html',
  styleUrl: './product-collection.component.css'
})
export class ProductCollectionComponent implements OnInit{
  products: Product[] = [];
  pagination: Pagination;
  catName?: string | null;
  userParams: UserParams;
  sortCollection = [
    { display: 'MỚI NHẤT', value: 'created_descending'}, 
    { display: 'CŨ NHẤT', value: 'created_ascending'}, 
    { display: 'GIÁ: TĂNG DẦN', value: 'price_ascending'}, 
    { display: 'GIÁ: GIẢM DẦN', value: 'price_descending'}, 
  ]

  constructor(private productService: ProductService, private route: ActivatedRoute) { 
    this.userParams = new UserParams();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catName = params.get('category');
      this.getProductsByCategory();
    });
  }

  getProductsByCategory() {
    this.productService.setUserParams(this.userParams);
    this.catName == null ? 
      this.productService.getProductsByCategory(this.userParams ,'all').subscribe(res => {
        this.products = res.result;
        this.pagination = res.pagination;
      }) :
      this.productService.getProductsByCategory(this.userParams, this.catName).subscribe(res => {
        this.products = res.result;
        this.pagination = res.pagination;
      })
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page+1;
    this.productService.setUserParams(this.userParams);
    this.getProductsByCategory();
  }

}
