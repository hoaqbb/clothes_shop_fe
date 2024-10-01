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
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model : any = {};

  constructor(private accountService: AccountService, private router: Router) { }

  login() {
    this.accountService.login(this.model).subscribe(() => this.router.navigateByUrl('/'));
  }
}
