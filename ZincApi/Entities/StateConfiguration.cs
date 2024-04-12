using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class StateConfiguration : IEntityTypeConfiguration<State>
{
  public void Configure(EntityTypeBuilder<State> builder)
  {
    builder.ToTable("States");

    builder.HasKey(s => s.Id);

    builder.Property(s => s.Id)
      .HasColumnName("ID")
      .ValueGeneratedOnAdd();

    builder.Property(s => s.CountryId)
      .HasColumnName("CountryID")
      .IsRequired();

    builder.Property(s => s.Name)
      .HasMaxLength(100);

    builder.Property(s => s.SortOrder);

    builder.Property(s => s.LongName)
      .HasMaxLength(150);

      }
}

