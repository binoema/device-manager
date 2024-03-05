using DeviceManagerApi.Interface;
using DeviceManagerApi.Models;
using Newtonsoft.Json;
using System.Security.Cryptography.Xml;

namespace DeviceManagerApi.Services
{
  public class DeviceService : ICrudService<Device>
  {
    const string FILE_PATH = "device_db.json";

    public DeviceService()
    {

    }

    public async Task<List<Device>> GetAllAsync(DeviceFilter deviceFilter)
    {
      if (!File.Exists(FILE_PATH))
      {
        return new List<Device>();
      }

      using (var reader = new StreamReader(FILE_PATH))
      {
        var deviceList = await reader.ReadToEndAsync();

        if (deviceFilter == null)
        {
          deviceFilter = new DeviceFilter();
        }

        if (deviceList == null) return new List<Device>();
        var devices = JsonConvert.DeserializeObject<List<Device>>(deviceList) ?? new List<Device>();
        List<Device> filteredDevices = Filter(deviceFilter, devices);
        return filteredDevices;
      }
    }

    private static List<Device> Filter(DeviceFilter deviceFilter, List<Device> devices)
    {
      if (String.Empty != deviceFilter.Name)
      {
        devices = devices.Where(device => device.Name.ToUpper().Contains(deviceFilter.Name.ToUpper())).ToList();
      }

      if (String.Empty != deviceFilter.DeviceTypeId)
      {
        devices = devices.Where(device => device.DeviceTypeId.ToUpper().Contains(deviceFilter.DeviceTypeId.ToUpper())).ToList();
      }

      if (deviceFilter.Failsafe != null)
      {
        devices = devices.Where(device => device.Failsafe == deviceFilter.Failsafe).ToList();
      }

      if (deviceFilter.TerminalElement != null)
      {
        devices = devices.Where(device => device.TerminalElement == deviceFilter.TerminalElement).ToList();
      }

      var filteredDevices = devices.Skip((deviceFilter.PageNumber - 1) * deviceFilter.PageSize)
                    .Take(deviceFilter.PageSize).ToList();

      return filteredDevices;
    }

    public async Task<List<Device>> Remove(string id)
    {
      var existingObjects = await GetAllAsync(new DeviceFilter());

      var objectToDelete = existingObjects.FirstOrDefault(d => d.Id == id);

      existingObjects.Remove(objectToDelete);
      await SaveAsync(existingObjects);

      return existingObjects;
    }

    public async Task<List<Device>> AddRangeAsync(IFormFile devicesFile)
    {
      using (var reader = new StreamReader(devicesFile.OpenReadStream()))
      {
        var fileContent = await reader.ReadToEndAsync();
        var deviceFile = JsonConvert.DeserializeObject<DeviceFile>(fileContent);

        var existingObjects = await GetAllAsync(new DeviceFilter());
        existingObjects.AddRange(deviceFile.Devices);
        await SaveAsync(existingObjects);
        return existingObjects;
      }
    }

    // Helper method to simulate async saving
    public async Task SaveAsync(List<Device> objects)
    {
      var jsonString = JsonConvert.SerializeObject(objects);
      using (var writer = new StreamWriter(FILE_PATH))
      {
        await writer.WriteAsync(jsonString);
        return;
      }
    }
  }
}
