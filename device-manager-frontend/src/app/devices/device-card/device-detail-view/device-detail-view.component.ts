import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DeviceStore } from '../../device.store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-device-detail-view',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './device-detail-view.component.html',
    styleUrl: './device-detail-view.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceDetailViewComponent {

  router = inject(Router);
  store = inject(DeviceStore);
  device = this.store.selectedDevice;

  get temp() {
    return `${this.device()?.tempMin} - ${this.device()?.tempMax} °C`
  }

  routeBackToOverview() {
    this.router.navigate(["device"]);
  }
 }
