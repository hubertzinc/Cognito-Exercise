using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class StoreSettingConfiguration : IEntityTypeConfiguration<StoreSetting>
{
  public void Configure(EntityTypeBuilder<StoreSetting> builder)
  {
    builder.ToTable("Store_Settings");
    builder.HasKey(x => x.StoreId);
    builder.Property(x => x.StoreId)
      .IsRequired()
      .HasColumnName("StoreID");
    builder.Property(x => x.SettingName)
      .IsRequired()
      .HasMaxLength(200);

    builder.Property(x => x.SettingValue)
      .IsRequired();
  }
}