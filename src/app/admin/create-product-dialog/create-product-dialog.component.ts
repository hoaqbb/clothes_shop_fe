import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { Color } from '../../models/color';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { Size } from '../../models/size';
import { FileUploadModule } from 'primeng/fileupload';
import { CreateProduct } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
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
  categories: Category[] = []
  colors: Color[] = []
  sizes: Size[] = []
  selectedColors: number[] = [];
  selectedSizes: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializForm();
    this.getAllCategory();
    this.getAllColor();
    this.getAllSize();
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

  getAllCategory() {
    this.adminService.getAllCategory().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  getAllColor() {
    this.adminService.getAllColor().subscribe((res: Color[]) => {
      this.colors = res;
    });
  }

  getAllSize() {
    this.adminService.getAllSize().subscribe((res: Size[]) => {
      this.sizes = res;
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
      productSizes: this.selectedSizes
    }
    
    this.adminService.createProduct(product).subscribe((res) => {
      this.onHide();
      this.toastr.success('Thêm sản phẩm thành công!');
    });
  }

   baseUrl = environment.apiUrl;
   onUpload(event: any) {
    const formData: FormData = new FormData();
    const id = 1008;  // Replace with the actual product ID

    // Append each file
    for (let file of event.files) {
      formData.append('files', file);
    }

    // Send the request to the server with the ID
    this.http.post(`${this.baseUrl}/api/Product/add-product-images?id=${id}`, formData)
      .subscribe(response => {
        console.log('Upload successful', response);
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

