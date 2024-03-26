namespace ZincApi.Entities;

public interface IStoreRepository
{
   Task<Store?> GetByIdAsync(int id);
   Task<List<Store>> GetAllAsync();
}