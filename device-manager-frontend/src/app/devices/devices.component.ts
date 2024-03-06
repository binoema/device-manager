import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';
import { Subscription } from 'rxjs';
import { DeviceCardComponent } from './device-card/device-card.component';
import { DeviceFilterComponent } from './device-filter/device-filter.component';
import { DeviceFilter } from './device-filter/device-filter.model';
import { Device } from './device.model';
import { DeviceService } from './device.service';
import { DeviceStore } from './device.store';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    CommonModule,
    DeviceCardComponent,
    MatButtonModule,
    RouterModule,
    DeviceFilterComponent,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent implements OnInit {
  private readonly store = inject(DeviceStore);
  private readonly router = inject(Router);
  private readonly deviceService = inject(DeviceService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private routeSub$: Subscription = new Subscription();

  public devices = this.store.devices;

  ngOnInit(): void {
    this.routeSub$ = this.activatedRoute.queryParams.subscribe((params) => {
      this.deviceService.getAll(params);
    });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  public removeDevice(id: string): void {
    this.deviceService.remove(id);
  }

  public addDevices(event: any): void {
    this.deviceService.addMany(event.target.files[0]);
  }

  public navigateToDetailView(device: Device): void {
    this.store.setSelecteDevice(device);
    this.router.navigate(['device', device.id], { state: device });
  }

  public applyFilter(filter: DeviceFilter) {
    this.router.navigate(
      [
        "/device"
      ],
      {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
        queryParams: {...filter}
      }
    );

    document.title = `Search: ${{...filter}}`;
  }
}
