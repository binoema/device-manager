using DeviceManagerApi.Models;
using DeviceManagerApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace DeviceManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : Controller
    {
        private DeviceService _deviceService;

        public DeviceController(DeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet]
        [Route("")]
        public async Task<List<Device>> GetAll()
        {
            return await _deviceService.GetAllAsync();
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task<List<Device>> Delete(string id)
        {
            return await _deviceService.Remove(id);
        }

        [HttpPost]
        public async Task<List<Device>> AddRange([FromBody] List<Device> devices)
        {
            return await _deviceService.AddAsync(devices);
        }

    }
}