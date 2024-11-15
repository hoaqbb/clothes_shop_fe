import { Component, Input } from '@angular/core';
import { OrderItem } from '../../../models/order';
import { environment } from '../../../../environments/environment.development';
import { globalModules } from '../../global.modules';

@Component({
  selector: 'app-checkout-item-card',
  standalone: true,
  imports: [globalModules],
  templateUrl: './checkout-item-card.component.html',
  styleUrl: './checkout-item-card.component.css'
})
export class CheckoutItemCardComponent {
  baseUrl = environment.apiUrl;
  @Input() item: OrderItem;
}
