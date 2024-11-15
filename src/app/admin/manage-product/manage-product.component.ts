import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../models/product';
import { Pagination } from '../../models/pagination';
import { UserParams } from '../../models/userParams';
import { PaginatorModule } from 'primeng/paginator';
import { CreateProductDialogComponent } from "../create-product-dialog/create-product-dialog.component";
import { UpdateProductDialogComponent } from "../update-product-dialog/update-product-dialog.component";
import { AdminService } from '../../core/services/admin.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { SelectInputComponent } from "../../shared/components/select-input/select-input.component";

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    CommonModule,
    FileUploadModule,
    PaginatorModule,
    CreateProductDialogComponent,
    UpdateProductDialogComponent,
    SelectInputComponent
],
  providers: [ConfirmationService],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css',
})
export class ManageProductComponent implements OnInit {
  toggleCreateDialog = false;
  toggleUpdateDialog = false;
  product: any;
  categories: any;
  sizes: any;
  colors: any;
  selectedProducts!: any | null;
  submitted: boolean = false;
  productDialog: boolean = false;
  products: Product[] = [];
  pagination: Pagination;
  userParams: UserParams;
  sortCollectionCategory = [
    { display: 'MỚI NHẤT', value: 'created_descending'}, 
    { display: 'TẤT CẢ', value: 'all'}, 
    { display: 'TOP', value: 'top'}, 
    { display: 'BOTTOM', value: 'bottom'}, 
    { display: 'OUTERWEAR', value: 'outerwear'}, 
    { display: 'BAG', value: 'bag'}, 
    { display: 'ACCESSORIES', value: 'accessory'}, 
  ];
  sortCollectionProduct = [
    { display: 'MỚI NHẤT', value: 'created_descending'}, 
    { display: 'CŨ NHẤT', value: 'created_ascending'}, 
    { display: 'GIÁ: TĂNG DẦN', value: 'price_ascending'}, 
    { display: 'GIÁ: GIẢM DẦN', value: 'price_descending'}, 
  ];

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService
  ) {
    this.userParams = new UserParams();
  }
  ngOnInit() {
    this.loadProductList();
  }
  a(aa) {
    console.log(aa);
    console.log(this.userParams);
  }

  loadProductList() {
    this.productService.setUserParams(this.userParams);
    this.productService.getProductsByCategory(this.userParams, 'all').subscribe((res) => {
      this.products = res.result;
      this.pagination = res.pagination;
    });
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page + 1;
    this.productService.setUserParams(this.userParams);
    this.loadProductList();
  }

  createProductDialog() {
    this.toggleCreateDialog = true;
  }

  selectedProductSlug: string;
  updateProductDialog(slug) {
    this.selectedProductSlug = slug;
    this.toggleUpdateDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    // this.submitted = false;
  }

  updateProductStatus(id) {
    this.adminService.updateProductStatus(id).subscribe({
      next: () => {
        this.toastr.success('Product status updated successfully!');
        const index = this.products.findIndex(p => p.id == id);
        this.products[index].isVisible = !this.products[index].isVisible;
      },
      error: err => this.toastr.error(err)
    })
  }

  editProduct(product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe(() => {
      this.loadProductList();
      this.toastr.success('Xóa sản phẩm thành công.');
    })
  }

  confirmDeleteAction(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.deleteProduct(id);
        },
        reject: () => {
        }
    });
}

}
