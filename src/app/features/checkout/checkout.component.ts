import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TextInputComponent } from "../../shared/components/text-input/text-input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../core/services/address.service';
import { CartService } from '../../core/services/cart.service';
import { CardItemSidebarCardComponent } from "../../shared/components/card-item-sidebar-card/card-item-sidebar-card.component";
import { CartItem } from '../../models/cart';
import { OrderRequest } from '../../models/order';
import { OrderService } from '../../core/services/order.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [TextInputComponent, ReactiveFormsModule, CardItemSidebarCardComponent, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  checkoutForm:  FormGroup;
  provinces: any;
  districts: any;
  wards: any;
  ship = 25000;
  tempCalculation = 0;
  amount = 0;

  constructor(
    private formBuilder: FormBuilder, 
    public cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getProvinces();
    this.calculateAmount();
    
  }

  initializeForm() {
    this.checkoutForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      street: ['', Validators.required],
      province: ['null', Validators.required],
      district: ['null', Validators.required],
      ward: ['null', Validators.required],
      shipping: ['1', Validators.required],
      paymentMethod: ['1', Validators.required],
      note: ['']
    })
  }
  

  getProvinces() {
    return this.addressService.getProvinces().subscribe((res: any) => {
      this.provinces = res.data;
    });

  }

  getDistricts(provinceId: string) {
    return this.addressService.getDistricts(provinceId).subscribe((res: any) => {
      this.districts = res.data;
    })
  }

  getWards(districtId: string) {
    return this.addressService.getWards(districtId).subscribe((res: any) => {
      this.wards = res.data;
    })
  }

  calculateAmount() {
    this.cartService.getUserCart().subscribe(res => {
      res.forEach(element => {
        if(element.discount) {
          this.tempCalculation += element.price*(100-element.discount)/100*element.quantity;
        } else {
          this.tempCalculation += element.quantity * element.price
        }
      });
      this.amount = this.tempCalculation + this.ship;
    });

  return this.amount;
  }

  createOrder() {
    const wardId = this.checkoutForm.get('ward').value;
    return this.addressService.getFullAddress(wardId).subscribe((res: any) => {
      const orderRequest: OrderRequest = {
        fullname: this.checkoutForm.get('fullname').value,
        email: this.checkoutForm.get('email').value,
        phoneNumber: this.checkoutForm.get('phoneNumber').value,
        address: this.checkoutForm.get('street').value + ', ' + res.data.full_name,
        paymentMethod: this.checkoutForm.get('paymentMethod').value,
        shipping: this.checkoutForm.get('shipping').value,
        amount: this.amount,
        note: this.checkoutForm.get('note').value
      };
      this.orderService.createOrder(orderRequest).subscribe((res: string) => {
        console.log(res);
        const isUrl = this.isValidUrl(res);
        if(!isUrl) {
          this.route.navigateByUrl('/payment-result');
        } else {
          window.location.href = `${res}`;
        }
      });
    })
  }
  
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

}
