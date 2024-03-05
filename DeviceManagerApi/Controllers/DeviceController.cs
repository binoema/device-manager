using DeviceManagerApi.Interface;
using DeviceManagerApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace DeviceManagerApi.Controllers
{
  [Route("[controller]")]
    [ApiController]
    public class DeviceController : Controller
    {
        private ICrudService<Device> _deviceService;

        public DeviceController(ICrudService<Device> deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet]
        [Route("")]
        public async Task<List<Device>> GetAll([FromQuery] DeviceFilter deviceFilter)
        {
            return await _deviceService.GetAllAsync(deviceFilter);
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task<List<Device>> Delete(string id)
        {
            return await _deviceService.Remove(id);

        }

        [HttpPost]
        public async Task<List<Device>> Add(IFormFile devices)
        {
            return await _deviceService.AddRangeAsync(devices);
        }

    }
}