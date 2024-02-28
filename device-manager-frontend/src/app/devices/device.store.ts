import { Injectable, signal } from "@angular/core";
import { Device } from "./device.model";

@Injectable({
  providedIn: 'root',
})
export class DeviceStore {

  public selectedDevice = signal<Device | null>(null);
  public devices = signal<Device[]>([]);

  public setSelecteDevice(device: Device) {
    this.selectedDevice.set(device);
  }

  public setAllDevices(devices: Device[]) {
    this.devices.set(devices);
  }
}
