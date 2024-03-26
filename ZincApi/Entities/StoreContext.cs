using Microsoft.EntityFrameworkCore;

namespace ZincApi.Entities;

public class StoreContext : DbContext
{
   public StoreContext(DbContextOptions<StoreContext> options)
      : base(options)
   {
   }

   public DbSet<Store> Stores { get; set; } = null!;
   public DbSet<UserProfile> UserProfiles { get; set; } = null!;
   public DbSet<UserStore> UserStores { get; set; } = null!;

   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
      modelBuilder.ApplyConfigurationsFromAssembly(typeof(StoreContext).Assembly);
      base.OnModelCreating(modelBuilder);
   }
}