using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class StoreConfiguration : IEntityTypeConfiguration<Store>
{
   public void Configure(EntityTypeBuilder<Store> builder)
    {
      builder.ToTable("Stores");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id).ValueGeneratedOnAdd();
      builder.Property(x => x.Name).HasMaxLength(200);
      builder.Property(x => x.Area).HasMaxLength(200);
      builder.Property(x => x.Url).HasMaxLength(200);
      builder.Property(x => x.TestSiteUrl).HasMaxLength(200);
      builder.Property(x => x.LogoImage).HasMaxLength(50);
    }
}