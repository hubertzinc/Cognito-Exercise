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
}