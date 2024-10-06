import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.css'
})
export class AccountDetailComponent implements OnInit{

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    
  }

  loadUserDetail() {
    // this.accountService.getUserDetail().subscribe((response) => {})
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }


}
