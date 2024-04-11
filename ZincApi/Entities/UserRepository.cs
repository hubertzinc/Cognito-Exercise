using Microsoft.EntityFrameworkCore;

namespace ZincApi.Entities;

public class UserRepository : IUserRepository
{
  private readonly StoreContext _context;

  public UserRepository(StoreContext context)
  {
    _context = context;
  }

  public async Task<UserProfile?> GetByUsernameAsync(string username)
  {
    return await _context.UserProfiles.FindAsync(username);
  }

  public async Task<bool> UserHasStoreAsync(string username, int storeId)
  {
    return await _context.UserProfiles
      .Where(u => u.UserName == username)
      .SelectMany(u => u.UserStores)
      .AnyAsync(us => us.StoreId == storeId);
  }
}