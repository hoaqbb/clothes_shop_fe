import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  model: any = {};
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private router: Router) {}

  // login() {
  //   this.accountService.login(this.model).subscribe({
  //     next: () => this.router.navigateByUrl('/'),
  //     error: (error) => this.validationErrors.push(error)
  //   })

  // }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        if (response && response.token) {
          // Kiểm tra xem phản hồi có chứa token không
          const role = this.accountService.getRoleFromToken(response.token);

          if (role === 'Admin') {
            this.router.navigate(['/admin']); // Điều hướng đến trang admin
          } else {
            this.router.navigate(['/']); // Điều hướng đến trang người dùng
          }
        } else {
          console.error('No token found in response');
        }
      },
      error: (error) => {
        console.log('Error:', error); // Log lỗi để kiểm tra
        this.validationErrors.push(error.error.message || 'An error occurred');
      },
    });
  }
}
