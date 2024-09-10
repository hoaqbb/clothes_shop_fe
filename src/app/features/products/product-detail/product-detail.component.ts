import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../../../models/product-detail';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductImage } from '../../../models/product-image';
import { NgFor } from '@angular/common';
import { environment } from '../../../../environments/environment.development';
import { ProductColor } from '../../../models/product-color';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [SlickCarouselModule, NgFor],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailComponent implements OnInit{
  baseUrl = environment.apiUrl;
  productDetail? : ProductDetail;
  productImages?: ProductImage[];

  @Input() colors?: ProductColor[] = [
    {
      "name": "XANH",
      "colorCode": "#055b26"
    },
    {
      "name": "HỒNG",
      "colorCode": "#ee8aa2"
    }
  ];

  availableColors: string[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if(slug) {
      this.productService.getProductBySlug(slug).subscribe(
        res => {
          this.productDetail = res,
          this.productImages = this.productDetail.productImages,
          this.extractColors(),
          console.log(this.productDetail);
      }
      )
    }
  }

  extractColors(): void {
    if (this.productDetail) {
      this.availableColors = [...new Set(this.productDetail.productVariants.map(variant => variant.color))];
    }
  }

  // Get sizes by color
  getSizesByColor(color: string) {
    return this.productDetail?.productVariants.filter(variant => variant.color === color) || [];
  }

  // getSizesByColor(p: ProductDetail) {

  // }
}
