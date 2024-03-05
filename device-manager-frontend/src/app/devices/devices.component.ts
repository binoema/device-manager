import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs';
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

  public devices = this.store.devices;

  ngOnInit(): void {
    // get Params from URL when URL is shared
    // this.activatedRoute.queryParams.subscribe((params) => {});
    this.loadAllDevices();
  }

  public loadAllDevices(): void {
    // this.applyFilter(filter);
    this.deviceService.getAll();
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

  public applyFilter(filter: Event) {
    this.router.navigate(
      [
        {
          filter: filter,
        },
      ],
      {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      }
    );

    document.title = `Search: ${filter}`;
  }
}
