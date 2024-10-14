import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail, ProductImage, ProductVariant } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';
import { ColorVariant } from '../../../models/color';
import { ProductListComponent } from "../product-list/product-list.component";
import { SizeColor } from '../../../models/size';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../../models/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductListComponent, FormsModule, GalleriaModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  baseUrl = environment.apiUrl;
  productDetail! : ProductDetail;
  productImages?: ProductImage[];
  variants!: ProductVariant[];
  colors!:  ColorVariant[];
  selectedColor: ColorVariant | null = null; 
  selectedSize?: string;
  selectedVariantId: number | null;
  
  onColorChange(color: ColorVariant) {
    this.selectedColor = color;  // Cập nhật màu đã chọn
  }

  
  onSizeChange(size: string) {
    this.selectedSize = size;
  }

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

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
          this.getSizesInColor(),
          this.selectedColor = this.colors[0];
          this.selectedSize = this.getFirstAvailableSize();
          console.log(this.colors);
          console.log(this.productDetail);
      }
      )
    }
    
    
  }

  getSizesInColor() {
    this.variants = this.productDetail.productVariants;
    this.colors = this.variants.reduce((acc: ColorVariant[], variant) => {
      const existingColor = acc.find(c => c.color === variant.color);
      
      if (!existingColor) {
        // If color doesn't exist, add it with initial size variant
        acc.push({
          color: variant.color,
          colorCode: variant.colorCode,
          variants: [{ id: variant.id, size: variant.size, amount: variant.amount }]
        });
      } else {
        // If color exists, just add the new size variant
        existingColor.variants?.push({
          id: variant.id,
          size: variant.size,
          amount: variant.amount
        });
      }
      
      return acc;
    }, []);
  }

  //auto check the first size available
  isFirstAvailableVariant(variant: SizeColor, $index: number): boolean {
    // Find the first available size in the selected color
    if(this.selectedColor?.variants){
      var firstAvailableIndex = this.selectedColor.variants.findIndex(v => v.amount > 0);
      // Check if the current variant matches that first available one
      return variant.amount > 0 && $index === firstAvailableIndex
    }

    return false;
  }

  getFirstAvailableSize(): string | undefined {
    if (this.selectedColor?.variants) {
      const firstAvailable = this.selectedColor.variants.find(v => v.amount > 0);
      return firstAvailable?.size;
    }
    return undefined;
  }

  @Output() event = new EventEmitter<void>()
  addToCart() {
    const selectedVariant = this.selectedColor?.variants?.find(variant => variant.size === this.selectedSize);
    this.selectedVariantId = selectedVariant.id;

    let isCartItemExisted = this.cartService.cartItems.find(x => x.productVariant.id === this.selectedVariantId)
    console.log(isCartItemExisted);
      if(isCartItemExisted) {
        if(isCartItemExisted.quantity < isCartItemExisted.productVariant.amount) {
          this.cartService.cartItems[this.cartService.cartItems.indexOf(isCartItemExisted)].quantity += 1;
          return this.cartService.addToCart(this.selectedVariantId).subscribe(() => {
            this.event.emit();
          })
        }

        return this.toastr.warning("Sản phẩm đã đạt tới giới hạn trong kho!");
      }
    return this.cartService.addToCart(this.selectedVariantId).subscribe((response: CartItem) => {
      this.cartService.cartItems.push(response)
    })
  }

  buy() {

  }
}
