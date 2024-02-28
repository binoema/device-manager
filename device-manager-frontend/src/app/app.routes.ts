import { Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailViewComponent } from './devices/device-card/device-detail-view/device-detail-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/device', pathMatch: 'full' },
  {
    path: 'device',
    component: DevicesComponent,
  },
  {
    path: 'device/:id',
    component: DeviceDetailViewComponent,
    data: { device: {} }
  }
];
