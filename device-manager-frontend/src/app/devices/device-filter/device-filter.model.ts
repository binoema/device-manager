export class DeviceFilter {
  [key: string]: any;
  name?: string;
  deviceTypeId?: string;
  failsafe?: boolean;
  terminalElement?: boolean;

  constructor(filter: DeviceFilter) {
    this.name = filter.name !== "" ? filter.name : undefined;
    this.deviceTypeId = filter.deviceTypeId !== "" ? filter.deviceTypeId : undefined;
    this.failsafe = filter.failsafe ?? undefined;
    this.terminalElement = filter.terminalElement ?? undefined;
  }
}
