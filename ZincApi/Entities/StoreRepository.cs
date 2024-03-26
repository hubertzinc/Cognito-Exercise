using Microsoft.EntityFrameworkCore;

namespace ZincApi.Entities;

public class StoreRepository : IStoreRepository
{
   private readonly StoreContext _context;

   public StoreRepository(StoreContext context)
   {
      _context = context;
   }

   public async Task<Store?> GetByIdAsync(int id)
   {
      return await _context.Stores.FindAsync(id);
   }

   public async Task<List<Store>> GetAllAsync()
   {
      return await _context.Stores.ToListAsync();
   }
}