import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar'; 
import { globalModules } from '../../../shared/global.modules';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, of, startWith, switchMap, tap } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { PaginationParams } from '../../../models/userParams';
import { Pagination } from '../../../models/pagination';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-search-sidebar',
  standalone: true,
  imports: [globalModules, SidebarModule, ReactiveFormsModule],
  templateUrl: './search-sidebar.component.html',
  styleUrl: './search-sidebar.component.css'
})
export class SearchSidebarComponent {
  @Input() show!: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  products: Product[];
  params: PaginationParams;
  pagination: Pagination;
  searchForm = new FormGroup({  
    search: new FormControl('')  
  });  

  constructor(private productService: ProductService, private toastr: ToastrService) { 
    this.params = new PaginationParams();
    this.searchForm.controls['search'].valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.productService.searchProduct(term, this.params)),  
      catchError(err => {    
        this.toastr.show(err);  
        return of([]);  
      })  
     )  
     .subscribe((data: any) => {
      this.products = data.result;
      this.pagination = data.pagination
     });
  }

  onHide() {
    this.showChange.emit(false);
  }

}
