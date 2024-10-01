import { Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-card-item-sidebar-card',
  standalone: true,
  imports: [],
  templateUrl: './card-item-sidebar-card.component.html',
  styleUrl: './card-item-sidebar-card.component.css'
})
export class CardItemSidebarCardComponent {
  baseUrl = environment.apiUrl;
  @Input() cartItem?: CartItem;


}
