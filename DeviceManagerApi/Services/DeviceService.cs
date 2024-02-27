using DeviceManagerApi.Models;
using DeviceManagerApi.Util;
using System.Text;

namespace DeviceManagerApi.Services
{
    public class DeviceService
    {
        const string FILE_PATH = "device_db.json";
        public DeviceService()
        {

        }

        public Task<List<Device>> GetAll()
        {

        }

        public List<Device> Remove() { }

        public List<Device> AddRange(List<Device> devices)
        {

            FileHandling.WriteTextAsync()

        }
    }
}
