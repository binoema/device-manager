import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Device } from './device.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly apiUrl = "https://localhost:7240/";

  http = inject(HttpClient);

  public getAll(): Observable<Array<Device>> {
    return this.http.get<Array<Device>>(this.apiUrl + "device");
  }

  public addMany(deviceFile: File): Observable<Array<Device>> {

    const formData = new FormData();

    formData.append("thumbnail", deviceFile);

    return this.http.post<Array<Device>>(this.apiUrl + "device", formData);
  }

  public remove(deviceId: string): Observable<Array<Device>> {
    return this.http.delete<Array<Device>>(this.apiUrl + "device" +  "/" + deviceId);
  }
}
