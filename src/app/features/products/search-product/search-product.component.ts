import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from "../product-list/product-list.component";
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product';
import { PaginationParams } from '../../../models/userParams';
import { PaginatorModule } from 'primeng/paginator';
import { Pagination } from '../../../models/pagination';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { globalModules } from '../../../shared/global.modules';

@Component({
  selector: 'app-search-sidebar',
  standalone: true,
  imports: [ProductListComponent, ReactiveFormsModule, PaginatorModule, globalModules],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit{
  keyword: string;
  products: Product[];
  params: PaginationParams;
  pagination: Pagination
  searchForm = new FormGroup ({
    keyword: new FormControl('')
  })

  constructor(private productService: ProductService, private route: ActivatedRoute,   private toastr: ToastrService) {
    this.params = new PaginationParams();
  }
  
  ngOnInit(): void {
    this.trackChangesInput();
    this.getKeywordFromParam();
  }

  getKeywordFromParam() {
    this.route.queryParams.subscribe(param => {
      this.keyword = param['keyword']
      if(this.keyword) {
        this.searchForm.controls['keyword'].setValue(this.keyword);
      }
      //remove query param
      window.history.replaceState({}, document.title, window.location.pathname);
    })
  }

  trackChangesInput() {
    this.searchForm.controls['keyword'].valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        this.resetPagination();
        return this.searchProductByKeyword();
      }),
      catchError(err => {    
        this.toastr.show(err);  
        return of({ result: [], pagination: null });  
      }))
      .subscribe((data: any) => {
        this.products = data.result;
        this.pagination = data.pagination;
     });
  }

  searchProductByKeyword() {
    this.keyword = this.searchForm.controls['keyword'].value;
    return this.productService.searchProduct(this.keyword, this.params);
  }

  resetPagination() {
    this.params = new PaginationParams();
    this.pagination = null;
  }

  pageChanged(event: any) {
    this.params.pageNumber = event.page + 1;
    this.searchProductByKeyword().subscribe({
      next: (data: any) => {
        this.products = data.result;
        this.pagination = data.pagination;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
