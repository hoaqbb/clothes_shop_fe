import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { FileUploadModule } from 'primeng/fileupload';
import { CreateProduct } from '../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [DialogModule, EditorModule, ReactiveFormsModule, CommonModule, FileUploadModule],
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.css'
})
export class CreateProductDialogComponent implements OnInit{
  @Input() show!: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  createProductForm: FormGroup;
  selectedColors: number[] = [];
  selectedSizes: number[] = [];
  mainImage: any;
  subImage: any;
  productImages: File[]=[];
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializForm();
  }

  initializForm() {
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      price: ['', Validators.required],
      discount: [0, Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  

  onColorChange(colorId: number, event: any): void {
    if (event.target.checked) {
      this.selectedColors.push(colorId);
    } else {
      const index = this.selectedColors.indexOf(colorId);
      if (index > -1) {
        this.selectedColors.splice(index, 1);
      }
    }
  }

  onSizeChange(sizeId: number, event: any): void {
    if (event.target.checked) {
      this.selectedSizes.push(sizeId);
    } else {
      const index = this.selectedSizes.indexOf(sizeId);
      if (index > -1) {
        this.selectedSizes.splice(index, 1);
      }
    }
  }

  onHide() {
    this.showChange.emit(false);
  }

  createProduct() {
    let product: CreateProduct = {
      name: this.createProductForm.get('name').value,
      slug: this.createProductForm.get('slug').value,
      price: this.createProductForm.get('price').value,
      description: this.createProductForm.get('description').value,
      discount: this.createProductForm.get('discount').value,
      categoryId: this.createProductForm.get('category').value,
      productColors: this.selectedColors,
      productSizes: this.selectedSizes,
      mainImage: this.mainImage,
      subImage: this.subImage,
      productImages: this.productImages
    }
    const formData = this.createFormData(product);
    
    this.isLoading = true;
    this.adminService.createProduct(formData).subscribe({
        next: (response) => {
          this.isLoading = false
          this.onHide();
          this.toastr.success('Thêm sản phẩm thành công!');
        },
        error: (error) => {
          this.isLoading = false;
          this.onHide();
          console.log(error);
          this.toastr.success('Lỗi khi sản phẩm!');
        }
      });
    }

  createFormData(product: CreateProduct) {
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    formData.append('discount', product.discount.toString());
    formData.append('slug', product.slug);
    formData.append('categoryId', product.categoryId.toString());

    // Thêm các mảng số
    product.productColors.forEach((colorId) => {
      formData.append(`productColors`, colorId.toString());
    });

    product.productSizes.forEach((sizeId) => {
      formData.append(`productSizes`, sizeId.toString());
    });

    // Thêm các file
    formData.append('mainImage', product.mainImage);
    formData.append('subImage', product.subImage);
    product.productImages.forEach((file) => {
      formData.append(`productImages`, file);
    });

    return formData;
  }

  onSelectedFile(event, varName) {
    switch(varName) {
      case 'mainImage': {
        this.mainImage = event.currentFiles[0];
        break;
      }
      case 'subImage': {
        this.subImage = event.currentFiles[0];
        break;
      }
      case 'productImages': {
        this.productImages = event.currentFiles
        break;
      }
      default: {
        break;
      }
    }
  }

}

