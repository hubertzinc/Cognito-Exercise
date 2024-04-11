using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class BannerConfiguration : IEntityTypeConfiguration<Banner>
{
  public void Configure(EntityTypeBuilder<Banner> builder)
  {
    builder.ToTable("Banners");

    builder.HasKey(b => b.Id);

    builder.Property(b => b.Id)
      .HasColumnName("ID")
      .IsRequired()
      .ValueGeneratedOnAdd();

    builder.Property(b => b.StoreId)
      .HasColumnName("StoreID")
      .IsRequired();

    builder.Property(b => b.BannerLocationId)
      .HasColumnName("BannerLocationID")
      .IsRequired();

    builder.Property(b => b.LanguageId)
      .HasColumnName("LanguageID")
      .IsRequired();

    builder.Property(b => b.Image)
      .HasColumnName("Image")
      .HasMaxLength(255);

    builder.Property(b => b.SortOrder)
      .HasColumnName("SortOrder")
      .IsRequired();

    builder.Property(b => b.DateStart)
      .HasColumnName("DateStart");
      
    builder.Property(b => b.DateEnd)
      .HasColumnName("DateEnd");

    builder.Property(b => b.DateModified)
      .HasColumnName("DateModified")
      .IsRequired();

    builder.Property(b => b.IsMovie)
      .IsRequired()
      .HasColumnName("IsMovie");

    builder.Property(b => b.IsActive)
      .IsRequired()
      .HasColumnName("IsActive");

    builder.Property(b => b.CategoryId)
      .HasColumnName("CategoryID");

    builder.Property(b => b.GroupBuyId)
      .HasColumnName("GroupBuyID");

    builder.Property(b => b.MobileImage)
      .HasColumnName("MobileImage")
      .HasMaxLength(255);
  }
}