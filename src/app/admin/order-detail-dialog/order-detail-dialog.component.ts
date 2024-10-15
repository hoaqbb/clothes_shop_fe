import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { OrderService } from '../../core/services/order.service';
import { OrderDetail } from '../../models/order';
import { CommonModule, DatePipe } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { AdminService } from '../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { CheckoutItemCardComponent } from '../../shared/components/checkout-item-card/checkout-item-card.component';


@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [DialogModule, DatePipe, CommonModule, StepsModule, CheckoutItemCardComponent],
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.css'
})
export class OrderDetailDialogComponent implements  OnChanges{
  @Input() show!: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  @Input() orderId: number;
  orderDetail: OrderDetail;
  loading = true;
  items: MenuItem[] | undefined;

  constructor(
    private orderService: OrderService, 
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  

  activeIndex: number = 0;

  onActiveIndexChange(event: number) {
        this.activeIndex = event;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderId'] && this.orderId) {
      this.loadOrderDetail(this.orderId);
      this.items = [
        {
            label: 'Chờ xác nhận',
        },
        {
            label: 'Đã xác nhận',
        },
        {
            label: 'Đang giao hàng',
        },
        {
            label: 'Thành công',
        }
      ];
    }
  }

  loadOrderDetail(orderId) {
    this.loading = true;
    this.orderService.getOrderDetail(orderId).subscribe((data) => {
      this.orderDetail = data;
      this.loading = false;
    })
  }

  updateStatusOrder(orderId) {
    this.adminService.updateStatusOrder(orderId).subscribe(() => {
      this.toastr.success('Cập nhật trạng thái thành công');
      this.onHide();
    })
  }

  onHide() {
    this.showChange.emit(false);
  }
}
