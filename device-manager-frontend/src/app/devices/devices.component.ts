import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable, take } from 'rxjs';
import { DeviceCardComponent } from './device-card/device-card.component';
import { Device } from './device.model';
import { DeviceService } from './device.service';
import { Router, RouterModule } from '@angular/router';
import { DeviceStore } from './device.store';

@Component({
    selector: 'app-devices',
    standalone: true,
    imports: [
      CommonModule,
      DeviceCardComponent,
      MatButtonModule,
      RouterModule
    ],
    templateUrl: './devices.component.html',
    styleUrl: './devices.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent implements OnInit {

  private readonly store = inject(DeviceStore);
  private readonly router = inject(Router);
  private readonly deviceService = inject(DeviceService);

  public devices = this.store.devices;

  ngOnInit(): void {
    this.deviceService.getAll();
  }

  public removeDevice(id: string): void {
    console.log("remove", id);
    this.deviceService.remove(id);
  }

  public addDevices(event: any): void {
    console.log("add");
    this.deviceService.addMany(event.target.files[0]);
  }

  public navigateToDetailView(device: Device): void {
    this.store.setSelecteDevice(device);
    this.router.navigate(["device", device.id], {state: device});
  }
 }
