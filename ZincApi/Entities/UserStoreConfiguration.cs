using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class UserStoreConfiguration : IEntityTypeConfiguration<UserStore>
{
   public void Configure(EntityTypeBuilder<UserStore> builder)
   {
      builder.ToTable("UserStores");

      builder.HasKey(x => new { x.UserName, x.StoreId });

      builder.Property(x => x.UserName)
         .HasMaxLength(256)
         .IsRequired();

      builder.Property(x => x.StoreId)
         .IsRequired();

      builder.HasOne(x => x.UserProfile)
         .WithMany(x => x.UserStores)
         .HasForeignKey(x => x.UserName);

      builder.HasOne(x => x.Store)
         .WithMany(x => x.UserStores)
         .HasForeignKey(x => x.StoreId);
   }
}