import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
  items: MenuItem[];

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-building-columns',
                command: () => this.onItemClick('admin/dashboard')
              },
              {
                label: 'Sản phẩm',
                icon: 'pi pi-warehouse',
                command: () => this.onItemClick('admin/product')
              },
              {
                label: 'Tài khoản',
                icon: 'pi pi-user',
                command: () => this.onItemClick('admin/account')
              },
              {
                label: 'Đơn hàng',
                icon: 'pi pi-shopping-bag',
                command: () => this.onItemClick('admin/order')
              },
              {
                label: 'Đăng xuất',
                icon: 'pi pi-shopping-bag',
                command: () => this.onItemClick('admin/logout')
              }
        ];
    }

    onItemClick(path: string) {
        this.router.navigate([path]);
      }


}
