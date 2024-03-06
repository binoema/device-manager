import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Device } from './device.model';
import { DeviceStore } from './device.store';
import { DeviceFilter } from './device-filter/device-filter.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly apiUrl = 'https://localhost:7240/';

  http = inject(HttpClient);
  store = inject(DeviceStore);

  public getAll(query: DeviceFilter): void {
    let params = new HttpParams();

    // Append each property from the query object
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        let value = query[key];
        if (value) {
          params = params.append(key, value);
        }
     }
    }

    this.http.get<Array<Device>>(this.apiUrl + 'device', {params: params}).subscribe((data) => {
      this.store.setAllDevices(data);
    });
  }

  public addMany(deviceFile: File): void {
    const formData = new FormData();

    formData.append('devices', deviceFile);

    this.http
      .post<Array<Device>>(this.apiUrl + 'device', formData)
      .subscribe((data) => {
        this.store.setAllDevices(data);
      });
  }

  public remove(deviceId: string): void {
    this.http
      .delete<Array<Device>>(this.apiUrl + 'device' + '/' + deviceId)
      .subscribe((data) => {
        this.store.setAllDevices(data);
      });
  }
}
