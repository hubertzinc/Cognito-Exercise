using Microsoft.EntityFrameworkCore;

namespace ZincApi.Entities;

public class StoreContext : DbContext
{
   public StoreContext(DbContextOptions<StoreContext> options)
        : base(options)
    {
    }

    public DbSet<Store> Stores { get; set; } = null!;
}