import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { OrderDetail } from '../../../models/order';
import { DatePipe } from '@angular/common';
import { CheckoutItemCardComponent } from "../../../shared/components/checkout-item-card/checkout-item-card.component";

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [DatePipe, CheckoutItemCardComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit{
  orderDetail: OrderDetail;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrderDetail();
  }

  loadOrderDetail() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.orderService.getOrderDetail(id).subscribe(res => {
        this.orderDetail = res
      })
    }
  }
  

}
