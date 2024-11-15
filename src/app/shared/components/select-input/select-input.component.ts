import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css'
})
export class SelectInputComponent {
  @Input() sortCollection = [];
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  onSelectChange(value: string) {
    this.valueChange.emit(value);
    
  }
  
}
