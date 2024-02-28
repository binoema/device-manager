import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { DeviceCardComponent } from './device-card/device-card.component';
import { Device } from './device.model';
import { DeviceService } from './device.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-devices',
    standalone: true,
    imports: [
      CommonModule,
      DeviceCardComponent,
      RouterModule
    ],
    templateUrl: './devices.component.html',
    styleUrl: './devices.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent implements OnInit {

  private readonly router = inject(Router);

  ngOnInit(): void {
    console.log("start");
    this.devices$ = this.deviceService.getAll();
  }

  public removeDevice(id: string): void {
    console.log("remove", id);
    this.devices$ = this.deviceService.remove(id);
  }

  public addDevices(event: any): void {
  public navigateToDetailView(device: Device): void {
    this.store.setSelecteDevice(device);
    this.router.navigate(["device", device.id], {state: device});
  }
 }
