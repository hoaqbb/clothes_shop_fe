import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { OrderDetail } from '../../../models/order';
import { globalModules } from '../../../shared/global.modules';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [globalModules],
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
