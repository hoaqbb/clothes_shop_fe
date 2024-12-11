import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiscountPipe } from './pipes/discount.pipe';

export const globalModules = [
  // Globally loaded modules
  CommonModule,
  RouterModule,
  DiscountPipe
]