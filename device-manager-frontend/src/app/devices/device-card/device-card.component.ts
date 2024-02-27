import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Device } from '../device.model';

@Component({
    selector: 'app-device-card',
    standalone: true,
    imports: [
        CommonModule,
      MatIconModule,
        MatButtonModule
    ],
    templateUrl: './device-card.component.html',
    styleUrl: './device-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceCardComponent {
  @Input() device: Device | undefined;
  @Output() click: EventEmitter<boolean> = new EventEmitter();
}
