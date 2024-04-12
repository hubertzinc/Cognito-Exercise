using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
  public void Configure(EntityTypeBuilder<Address> builder)
  {
    builder.ToTable("Addresses");

    builder.HasKey(a => a.Id);

    builder.Property(a => a.Id)
      .HasColumnName("ID")
      .ValueGeneratedOnAdd();

    builder.Property(a => a.AddressTypeID)
      .HasColumnName("AddressTypeID")
      .IsRequired();

    builder.Property(a => a.FirstName)
      .HasMaxLength(152);

    builder.Property(a => a.LastName)
      .HasMaxLength(152);

    builder.Property(a => a.Phone)
      .HasMaxLength(88);

    builder.Property(a => a.CompanyName)
      .HasMaxLength(152);

    builder.Property(a => a.AddressLine1)
      .HasMaxLength(684);

    builder.Property(a => a.AddressLine2)
      .HasMaxLength(684);

    builder.Property(a => a.City)
      .HasMaxLength(88);

    builder.Property(a => a.StateID)
      .HasColumnName("StateID");
      
    builder.Property(a => a.PostCode)
      .HasMaxLength(24);

    builder.Property(a => a.Email)
      .HasMaxLength(152);

    builder.Property(a => a.CountryId)
      .HasColumnName("CountryID");

    builder.HasOne(a => a.State)
      .WithMany()
      .HasForeignKey(a => a.StateID);

    builder.HasOne(a => a.Country)
      .WithMany()
      .HasForeignKey(a => a.CountryId);
  }
}