import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.css'
})
export class CreateProductDialogComponent {
  @Input() toggle: boolean;
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
