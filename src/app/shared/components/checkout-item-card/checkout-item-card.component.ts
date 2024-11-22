import { Component, Input } from '@angular/core';
import { OrderItem } from '../../../models/order';
import { globalModules } from '../../global.modules';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-checkout-item-card',
  standalone: true,
  imports: [globalModules, BadgeModule],
  templateUrl: './checkout-item-card.component.html',
  styleUrl: './checkout-item-card.component.css'
})
export class CheckoutItemCardComponent {
  @Input() item: OrderItem;
}
