import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProductDetail, ProductVariant } from '../../models/product';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AdminService } from '../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-quantity-dialog',
  standalone: true,
  imports: [DialogModule, CommonModule, TableModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './update-quantity-dialog.component.html',
  styleUrl: './update-quantity-dialog.component.css'
})
export class UpdateQuantityDialogComponent implements OnChanges{
  @Input() show!: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  @Input() slug: string;
  product: ProductDetail;
  productVariants: ProductVariant[] = [];
  productDialog = false;
  loading = true;
  isLoading = false;

  constructor(
    private productService: ProductService, 
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slug'] && this.slug) {
      this.loadProductDetail(this.slug);
    }
  }

  loadProductDetail(slug: string) {
    this.loading = true;
    this.productService.getProductBySlug(slug).subscribe(res => {
      this.product = res;
      this.productVariants = this.product.productVariants;
      this.loading = false;
    })
  }

  updateProductQuantity() {
    this.isLoading = true;
    this.adminService.updateProductQuantity(this.product.id, this.productVariants).subscribe(
      {
        next: () => {
          this.isLoading = false;
          this.onHide();
          this.toastr.success('Cập nhật sản phẩm trong kho thành công!')
        },
        error: (error) => {
          this.isLoading = false;
          this.onHide();
          this.toastr.warning(error)
        }
      }
      );
  }
  
  onEdit(event, quantityId) {
    this.productVariants.find(x => x.id == quantityId).amount = event.target.value;
}


  onHide() {
    this.showChange.emit(false);
  }
}
