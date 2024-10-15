import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AdminService } from '../../core/services/admin.service';
import { Order } from '../../models/order';
import { UserParams } from '../../models/userParams';
import { Pagination } from '../../models/pagination';
import { PaginatorModule } from 'primeng/paginator';
import { OrderDetailDialogComponent } from "../order-detail-dialog/order-detail-dialog.component";

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [TableModule, CommonModule, DatePipe, PaginatorModule, OrderDetailDialogComponent],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css',
})
export class ManageOrderComponent implements OnInit {
  toggleOrderDetailDialog = false;
  orderList: Order[];
  userParams: UserParams;
  pagination: Pagination;

  constructor(private adminService: AdminService) {
    this.userParams = this.adminService.getUserParams();
  }

  ngOnInit(): void {
    this.loadAllOrder();
  }

  selectedOrderId
  orderDetailDialog(id) {
    this.selectedOrderId = id;
    this.toggleOrderDetailDialog = true;
  }
  hideDialog() {
    this.toggleOrderDetailDialog = false;
  }

  loadAllOrder() {
    this.adminService.setUserParams(this.userParams);
    this.adminService.getAllOrder(this.userParams).subscribe((res) => {
      this.orderList = res.result;
      this.pagination = res.pagination;
    });
  }

  getStatusLabel(status: number): string {
    if (status === 1) {
      return 'Đã hoàn thành';
    } else if (status === 0) {
      return 'Đang vận chuyển';
    } else {
      return 'Đang chuẩn bị';
    }
  }

  getStatusClass(status: number): string {
    if (status === 1) {
      return 'shipped';
    } else if (status === 0) {
      return 'pending';
    } else {
      return 'prepared';
    }
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page + 1;
    this.adminService.setUserParams(this.userParams);
    this.loadAllOrder();
  }
}
