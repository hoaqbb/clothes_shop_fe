import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";
import { SplitterModule } from 'primeng/splitter';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, SplitterModule, RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit{

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllColor();
    this.getAllSize();
  }

  getAllCategory() {
    this.adminService.getAllCategory().subscribe(() => {
      
    });
  }

  getAllColor() {
    this.adminService.getAllColor().subscribe(() => {

    });
  }

  getAllSize() {
    this.adminService.getAllSize().subscribe(() => {
      
    });
  }
}
  
