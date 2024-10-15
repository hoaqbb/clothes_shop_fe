import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../core/services/product.service';
import { Pagination } from '../../models/pagination';
import { UserParams } from '../../models/userParams';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { UpdateQuantityDialogComponent } from "../update-quantity-dialog/update-quantity-dialog.component";

@Component({
  selector: 'app-manage-quantity',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule, UpdateQuantityDialogComponent],
  templateUrl: './manage-quantity.component.html',
  styleUrl: './manage-quantity.component.css'
})
export class ManageQuantityComponent implements OnInit{
  products: Product[];
  pagination: Pagination;
  userParams: UserParams;
  toggleQuantityDialog = false;
  selectedProduct

  constructor(private productService: ProductService) {
    this.userParams = new UserParams();
  }

  ngOnInit(): void {
    this.loadProduts();
  }

  loadProduts() {
    this.productService.setUserParams(this.userParams);
    this.productService.getProductsByCategory(this.userParams, 'all').subscribe((res) => {
      this.products = res.result;
      this.pagination = res.pagination;
    });

  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page + 1;
    this.productService.setUserParams(this.userParams);
    this.loadProduts();
  }

  updateQuantityDialog(slug) {
    this.selectedProduct = slug;
    this.toggleQuantityDialog = true;
  }

  hideDialog() {
    this.toggleQuantityDialog = false;
  }
}
