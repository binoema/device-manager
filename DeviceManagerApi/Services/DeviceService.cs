using DeviceManagerApi.Interface;
using DeviceManagerApi.Models;
using Newtonsoft.Json;

namespace DeviceManagerApi.Services
{
    public class DeviceService : ICrudService<Device>
    {
        const string FILE_PATH = "device_db.json";
        public DeviceService()
        {

        }

        public async Task<List<Device>> GetAllAsync()
        {
            if (!File.Exists(FILE_PATH))
            {
                return new List<Device>();
            }

            using (var reader = new StreamReader(FILE_PATH))
            {
                var deviceList = await reader.ReadToEndAsync();

                if (deviceList == null) return new List<Device>();
                return JsonConvert.DeserializeObject<List<Device>>(deviceList) ?? new List<Device>();
            }
        }

        public async Task<List<Device>> Remove(string id) {

            var existingObjects = await GetAllAsync();

            var objectToDelete = existingObjects.FirstOrDefault(d => d.Id == id);

            existingObjects.Remove(objectToDelete);
            await SaveAsync(existingObjects);

            return existingObjects;

        }

        public async Task<List<Device>> AddAsync(IFormFile devicesFile)
        {
            using (var reader = new StreamReader(devicesFile.OpenReadStream()))
            {
                var fileContent = await reader.ReadToEndAsync();
                var devices = JsonConvert.DeserializeObject<List<Device>>(fileContent);

                var existingObjects = await GetAllAsync();
                existingObjects.AddRange(devices);
                await SaveAsync(existingObjects);
                return existingObjects;
            }
        }

        // Helper method to simulate async saving
        public async Task SaveAsync(List<Device> objects)
        {
            var json = JsonConvert.SerializeObject(objects);
            using (var writer = new StreamWriter(FILE_PATH))
            {
                await writer.WriteAsync(json);
            }
        }
    }
}
