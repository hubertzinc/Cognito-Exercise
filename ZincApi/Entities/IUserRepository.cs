namespace ZincApi.Entities;

public interface IUserRepository
{
  Task<UserProfile?> GetByUsernameAsync(string username);
  Task<bool> UserHasStoreAsync(string username, int storeId);
}