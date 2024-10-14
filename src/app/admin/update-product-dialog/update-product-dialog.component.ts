import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Product, ProductDetail, ProductImage, UpdateProduct } from '../../models/product';
import { AdminService } from '../../core/services/admin.service';
import { ProductService } from '../../core/services/product.service';
import { EditorModule } from 'primeng/editor';
import { FileUpload, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { Size } from '../../models/size';
import { Color } from '../../models/color';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product-dialog',
  standalone: true,
  imports: [DialogModule, EditorModule, CommonModule, ReactiveFormsModule, FileUploadModule],
  templateUrl: './update-product-dialog.component.html',
  styleUrl: './update-product-dialog.component.css'
})
export class UpdateProductDialogComponent implements OnChanges{
  
  @Input() show!: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  @Input() slug: string;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  product: ProductDetail;
  categories: Category[] = [];
  colors: Color[] = [];
  sizes: Size[] = [];
  updateProductForm: FormGroup;
  productDialog = false;
  loading = true;
  mergedColors: any;
  mergedSizes: any;
  selectedColors: number[] = [];
  selectedSizes: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private productService: ProductService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slug'] && this.slug) {
      this.loadProductDetail(this.slug);
      // this.getAllCategory();
      // this.getAllColor();
      // this.getAllSize();
    }
  }

  loadProductDetail(slug) {
    this.loading = true;
    this.productService.getProductBySlug(slug).subscribe((response) => {
      this.product = response;
      this.initializeForm(response);
      this.getAllCategory();
      this.getAllColor();
      this.getAllSize();
      this.loading = false;
    })
  }

  getAllCategory() {
    this.adminService.getAllCategory().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }
  
  getAllColor() {
    this.adminService.getAllColor().subscribe((res: Color[]) => {
      this.colors = res;
      this.mergedColors = this.colors.map(color => {
        const isChecked = this.product.productVariants.some(pColor => pColor.colorCode == color.colorCode);
        if(isChecked) this.selectedColors.push(color.id)
        return { ...color, checked: isChecked };
      });
      console.log(this.mergedColors);
      console.log(this.selectedColors);
      
    });
  }

  getAllSize() {
    this.adminService.getAllSize().subscribe((res: Size[]) => {
      this.sizes = res;
      this.mergedSizes = this.sizes.map(size => {
        const isChecked = this.product.productVariants.some(pSize => pSize.size == size.name);
        if(isChecked) this.selectedSizes.push(size.id)
        return { ...size, checked: isChecked };
      });
      console.log(this.mergedSizes);
      console.log(this.selectedSizes);
    });
  }

  initializeForm(product: ProductDetail) {
    this.updateProductForm = this.formBuilder.group({
      name: [product.name, Validators.required],
      slug: [product.slug, Validators.required],
      price: [product.price, Validators.required],
      discount: [product.discount, Validators.required],
      categoryId: [product.category.id, Validators.required],
      description: [product.description, Validators.required]
    });
  }

  onColorChange(colorId: number, event: any): void {
    if (event.target.checked) {
      this.selectedColors.push(colorId);
      console.log(this.selectedColors);
    } else {
      const index = this.selectedColors.indexOf(colorId);
      if (index > -1) {
        this.selectedColors.splice(index, 1);
        console.log(this.selectedColors);
      }
    }
  }

  onSizeChange(sizeId: number, event: any): void {
    if (event.target.checked) {
      this.selectedSizes.push(sizeId);
      console.log(this.selectedSizes);
    } else {
      const index = this.selectedSizes.indexOf(sizeId);
      if (index > -1) {
        this.selectedSizes.splice(index, 1);
        console.log(this.selectedSizes);
      }
    }
  }

  updateProduct() {
    const updateProduct: UpdateProduct = {
      id:  this.product.id,
      name: this.updateProductForm.get('name').value,
      slug: this.updateProductForm.get('slug').value,
      price: this.updateProductForm.get('price').value,
      discount: this.updateProductForm.get('discount').value,
      categoryId: this.updateProductForm.get('categoryId').value,
      description: this.updateProductForm.get('description').value,
      productColors: this.selectedColors,
      productSizes: this.selectedSizes
    };
    console.log(updateProduct);
    this.adminService.updateProduct(updateProduct).subscribe({
      next: () => {
        this.toastr.success('Product updated successfully');
        // this.onHide();
      },
      error: (err) => this.toastr.warning(err)
    })
     
  }

  onHide() {
    this.showChange.emit(false);
  }

  deleteImage(productId, imageId) {
    this.adminService.deleteProductImage(productId, imageId).subscribe((response) => {
      console.log('delete');
      this.product.productImages = this.product.productImages.filter(x => x.id !== imageId);
    })
  }

  setMainPhoto(productId: number, image: ProductImage) {
    this.adminService.setMainImage(productId, image.id).subscribe(() => {
      this.product.productImages.forEach(p => {
        if(p.isMain) p.isMain = false;
        if(p.id === image.id) p.isMain = true;
      })
    })
  }

  setSubPhoto(productId: number, image: ProductImage) {
    this.adminService.setSubImage(productId, image.id).subscribe(() => {
      this.product.productImages.forEach(p => {
        if(p.isSub) p.isSub = false;
        if(p.id === image.id) p.isSub = true;
      })
    })
  }

  baseUrl = environment.apiUrl;
  onUpload(event: any) {
   const formData: FormData = new FormData();

   // Append each file
   for (let file of event.files) {
     formData.append('files', file);
   }

   // Send the request to the server with the ID
   this.http.post<ProductImage[]>(`${this.baseUrl}/api/Product/add-product-images?id=${this.product.id}`, formData)
     .subscribe(response => {
      if (!this.product.productImages) {
        this.product.productImages = [];
    }
      this.product.productImages = this.product.productImages.concat(response);
      this.fileUpload.clear(); 
     }, error => {
       console.error('Upload error', error);
     });
 }

 uploadedFiles: any[] = [];
 fileHandle(event: UploadEvent) {
 for(let file of event.files) {
     this.uploadedFiles.push(file);
 }
}

}
interface UploadEvent {
 originalEvent: Event;
 files: File[];
}
