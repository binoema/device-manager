import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { DeviceCardComponent } from './device-card/device-card.component';
import { Device } from './device.model';
import { DeviceService } from './device.service';

@Component({
    selector: 'app-devices',
    standalone: true,
    imports: [
      CommonModule,
      DeviceCardComponent,
      MatButtonModule
    ],
    templateUrl: './devices.component.html',
    styleUrl: './devices.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent implements OnInit {

  deviceService = inject(DeviceService);
  devices$: Observable<Device[]> = new Observable();

  ngOnInit(): void {
    console.log("start");
    this.devices$ = this.deviceService.getAll();
  }

  public removeDevice(id: string): void {
    console.log("remove", id);
    this.devices$ = this.deviceService.remove(id);
  }

  public addDevices(event: any): void {
    console.log(event.target.files);
    console.log(event.target.files[0]);
    this.devices$ = this.deviceService.addMany(event.target.files[0]);
  }
 }
