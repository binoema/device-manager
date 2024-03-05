import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeviceFilter } from './device-filter.model';

@Component({
  selector: 'app-device-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatCheckboxModule],
  templateUrl: './device-filter.component.html',
  styleUrl: './device-filter.component.scss',
})
export class DeviceFilterComponent {
  public deviceFilter: DeviceFilter = {};

  @Output() activateFilter = new EventEmitter();

  public submitFilter(): void {
    this.activateFilter.emit(this.deviceFilter);
  }
}
