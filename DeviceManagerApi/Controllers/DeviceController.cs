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
        public Task<ActionResult> GetAll() {
        return await _deviceService.GetAll()
                }
        //[HttpGet]
        //public Task<ActionResult> Get(int id) { }
        [HttpDelete]
        [Route("{id}")]
        public Task<ActionResult> Delete(int id)
        {
            return new OkObjectResult(null);
        }

        [HttpPost]
        public Task<ActionResult> AddRange()
        {

        }

    }
}