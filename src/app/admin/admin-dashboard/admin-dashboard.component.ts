import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { AdminService } from '../../core/services/admin.service';
import { TagModule } from 'primeng/tag';
import { globalModules } from '../../shared/global.modules';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ChartModule, TableModule, CommonModule, TableModule, TagModule, globalModules, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  overviewData: any;
  revenueData: any;

  chartData: any;
  chartOptions: any;
  pieChartData: any;
  pieChartOptions: any;
  selectedYear: number;

  constructor(private adminService: AdminService) {}

  getOverview() {
    this.adminService.getOverview().subscribe((res: any) => {
      this.overviewData = res;
      this.pieChartInit();
    });
  }

  getRevenueChart() {
    this.adminService.getRevenue().subscribe((res: any) => {
      this.revenueData = res;
      console.log(this.revenueData);
      
      this.selectedYear = this.revenueData.years.at(-1); //get last element of array
      this.chartInit();
    });
  }

  getRevenueChartWithYear(year: number) {
    this.adminService.getRevenueWithYear(year).subscribe((res: any) => {
      this.revenueData = res;
      this.selectedYear = year;
      this.chartInit();
    });
  }

  ngOnInit() {
    this.getOverview();
    this.getRevenueChart();
  }

  //Doanh thu từng tháng theo năm
  chartInit() {
    const documentStyle = getComputedStyle(document.documentElement);

    const months = this.revenueData.revenues.map((x) => x.month.toString());
    const revenue = this.revenueData.revenues.map((x) => x.revenue);
    const totalOrder = this.revenueData.revenues.map((x) => x.totalOrder);

    this.chartData = {
      labels: months,
      datasets: [
        {
          label: 'Doanh thu',
          data: revenue,
          backgroundColor: documentStyle.getPropertyValue('--teal-400'),
        },
        {
          label: 'Đơn hàng',
          data: totalOrder,
          backgroundColor: documentStyle.getPropertyValue('--red-400'),
        },
      ],
    };

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
    };
  }
  
  //Doanh số theo danh mục
  pieChartInit() {
    const categories = this.overviewData.categorySales.map((x) => x.categoryName);
    const data = this.overviewData.categorySales.map((x) => x.totalSold);

    this.pieChartData = {
      labels: categories,
      datasets: [
        {
          data: data
        },
      ],
    };

    this.pieChartOptions = {
      responsive: true,
      cutout: '60%'
    };
  }

}
