using DeviceManagerApi.Models;

namespace DeviceManagerApi.Interface
{
    public interface ICrudService<T>
    {
        Task<List<T>> GetAllAsync(DeviceFilter deviceFilter);

        public Task<List<T>> Remove(string id);
        public Task<List<T>> AddRangeAsync(IFormFile devicesFile);



    }
}
