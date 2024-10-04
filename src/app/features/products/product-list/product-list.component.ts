import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  @Input() products: Product[] = [];
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    
  }

  
}
