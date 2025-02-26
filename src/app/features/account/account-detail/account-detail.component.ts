import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { AccountService } from '../../../core/services/account.service';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../models/order';
import { CommonModule, DatePipe } from '@angular/common';
import { UserDetail } from '../../../models/user';
import { UserParams } from '../../../models/userParams';
import { Pagination } from '../../../models/pagination';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [DatePipe, RouterLink, TableModule, CommonModule, PaginatorModule, TagModule],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.css'
})
export class AccountDetailComponent implements OnInit{
  userDetail: UserDetail;
  userParams: UserParams;
  pagination: Pagination;
  userOrders: Order[];
  loading = false;

  constructor(
    private accountService: AccountService, 
    private orderService: OrderService,
    private router: Router
  ) { 
    this.userParams = this.orderService.getUserParams();
  }

  ngOnInit(): void {
    this.loadUserDetail();
    this.loadUserOrders();
  }

  loadUserDetail() {
    this.accountService.getUserDetail().subscribe(res => {
      this.userDetail = res;
    })
  }

  loadUserOrders() {
    this.loading = true;
    this.orderService.setUserParams(this.userParams);
    this.orderService.getUserOrders(this.userParams).subscribe(res => {
      this.userOrders = res.result;
      this.pagination = res.pagination;
      this.loading = false;
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page + 1;
    this.orderService.setUserParams(this.userParams);
    this.loadUserOrders();
  }
}
