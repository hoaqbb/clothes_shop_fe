import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateProductDialogComponent } from "../create-product-dialog/create-product-dialog.component";
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { Color } from '../../models/color';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { Size } from '../../models/size';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CreateProductDialogComponent, DialogModule, EditorModule, ReactiveFormsModule, CommonModule, FileUploadModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit{
  @Output() togglee = new EventEmitter<Boolean>();
  createProductForm: FormGroup;
  categories: Category[] = []
  colors: Color[] = []
  sizes: Size[] = []
  selectedColors: number[] = [];
  selectedSizes: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
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
      discount: ['0', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      productColor: ['', Validators.required],
      productSize: ['', Validators.required],
      productImages: this.formBuilder.array([])
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
      const index = this.selectedColors.indexOf(sizeId);
      if (index > -1) {
        this.selectedSizes.splice(index, 1);
        console.log(this.selectedSizes);
      }
    }
  }

  get productImages(): FormArray {
    return this.createProductForm.get('productImages') as FormArray;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      Array.from(fileInput.files).forEach(file => {
        this.productImages.push(this.formBuilder.control(file.name));  // Chỉ lưu tên file hoặc thông tin file vào FormArray
      });
    }
  }

  removeImage(index: number): void {
    this.productImages.removeAt(index);  // Xóa hình ảnh từ FormArray
  }

   toggle() {
    this.togglee.emit(true);
    console.log(this.togglee);
    
   }

   log() {
    console.table(this.createProductForm.value)
    
   }
}
  
