import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { environment } from '../../../../environments/environment.development';
import { RouterModule } from '@angular/router';
import { ProductColor } from '../../../models/product';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, NgStyle],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  public baseUrl = environment.apiUrl;
  @Input() product!: Product;
  productColors?: ProductColor[];
  

  constructor() {
    if(this.product){
      this.productColors = this.product.productColors;
    }
   }
  
}
