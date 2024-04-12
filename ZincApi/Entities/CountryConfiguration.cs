using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class CountryConfiguration : IEntityTypeConfiguration<Country>
{
  public void Configure(EntityTypeBuilder<Country> builder)
  {
    builder.ToTable("Countries");

    builder.HasKey(c => c.Id);

    builder.Property(c => c.Id)
      .HasColumnName("ID")
      .ValueGeneratedOnAdd();

    builder.Property(c => c.Name)
      .HasMaxLength(100)
      .IsRequired();

    builder.Property(c => c.Code)
      .HasMaxLength(2)
      .IsRequired();
  }
}