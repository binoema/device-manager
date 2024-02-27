namespace DeviceManagerApi.Interface
{
    public interface ICrudService<T>
    {
        Task<List<T>> GetAllAsync();

        public Task<List<T>> Remove(string id);
        public Task<List<T>> AddAsync(List<T> devices);



    }
}
