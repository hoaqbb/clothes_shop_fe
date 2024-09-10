import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../../features/authentication/login/login.component';
import { RegisterComponent } from '../../../features/authentication/register/register.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, LoginComponent, RegisterComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
