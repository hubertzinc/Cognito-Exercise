namespace ZincApi.Entities;

public interface IUserRepository
{
   Task<UserProfile?> GetByUsernameAsync(string username);
}