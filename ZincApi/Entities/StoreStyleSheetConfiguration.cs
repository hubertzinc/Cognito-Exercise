using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class StoreStylesheetConfiguration : IEntityTypeConfiguration<StoreStylesheet>
{
  public void Configure(EntityTypeBuilder<StoreStylesheet> builder)
  {
    builder.ToTable("StoreStylesheets");
    builder.HasKey(x => x.Id);
    builder.Property(x => x.Id).ValueGeneratedOnAdd();
    builder.Property(x => x.Link).HasMaxLength(200);
  }
}