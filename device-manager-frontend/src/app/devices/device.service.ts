import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Device } from './device.model';
import { Observable } from 'rxjs';
import { DeviceStore } from './device.store';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly apiUrl = "https://localhost:7240/";

  http  = inject(HttpClient);
  store = inject(DeviceStore);

  public getAll(): void {
    this.http.get<Array<Device>>(this.apiUrl + "device").subscribe((data) => {
      this.store.setAllDevices(data);
    });
  }

  public addMany(deviceFile: File): void {
    const formData = new FormData();

    formData.append("devices", deviceFile);

    this.http.post<Array<Device>>(this.apiUrl + "device", formData).subscribe((data) => {
      this.store.setAllDevices(data);
    });
  }

  public remove(deviceId: string): void {
    this.http.delete<Array<Device>>(this.apiUrl + "device" +  "/" + deviceId).subscribe((data) => {
      this.store.setAllDevices(data);
    });
  }
}
