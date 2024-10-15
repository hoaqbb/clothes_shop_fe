import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
  items: MenuItem[];

    constructor(private router: Router, private accountService: AccountService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-building-columns',
                command: () => this.onItemClick('admin/dashboard')
              },
              {
                label: 'Đơn hàng',
                icon: 'pi pi-shopping-bag',
                command: () => this.onItemClick('admin/order')
              },
              {
                label: 'Sản phẩm',
                icon: 'pi pi-objects-column',
                command: () => this.onItemClick('admin/product')
              },
              {
                label: 'Kho',
                icon: 'pi pi-warehouse',
                command: () => this.onItemClick('admin/quantity')
              },
              {
                label: 'Thể loại',
                icon: 'pi pi-book',
                command: () => this.onItemClick('admin/quantity')
              },
              {
                label: 'Màu sắc',
                icon: 'pi pi-palette',
                command: () => this.onItemClick('admin/quantity')
              },
              {
                label: 'Đăng xuất',
                icon: 'pi pi-sign-out',
                command: () => {
                  this.accountService.logout()
                  this.router.navigateByUrl('/');
                }
              }
        ];
    }

    onItemClick(path: string) {
        this.router.navigate([path]);
      }


}
