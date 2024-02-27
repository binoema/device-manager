using DeviceManagerApi.Interface;
using DeviceManagerApi.Models;
using DeviceManagerApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

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
        public async Task<List<Device>> AddRange([FromForm] IFormFile devicesFile)
        {
            return await _deviceService.AddAsync(devicesFile);
        }

    }
}