using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ZincApi.Entities;

public class UserProfileConfiguration : IEntityTypeConfiguration<UserProfile>
{
   public void Configure(EntityTypeBuilder<UserProfile> builder)
   {
      builder.ToTable("UserProfiles");

      builder.HasKey(u => u.UserName);

      builder.Property(u => u.UserName)
        .HasMaxLength(256)
        .IsRequired();

      builder.Property(u => u.Email)
      .HasMaxLength(256);

      builder.Property(u => u.PhoneNumber)
        .HasColumnType("nvarchar(max)");

      builder.Property(u => u.PhoneNumberConfirmed)
        .IsRequired();

      builder.Property(u => u.CurrencyId)
        .HasColumnName("CurrencyID");

      builder.Property(u => u.FirstName)
        .HasMaxLength(100);

      builder.Property(u => u.LastName)
        .HasMaxLength(100);

      builder.Property(u => u.ShippingAddressId)
        .HasColumnName("ShippingAddressID");

      builder.Property(u => u.BillingAddressId)
        .HasColumnName("BillingAddressID");

      builder.Property(u => u.Age);

      builder.Property(u => u.Gender)
        .HasMaxLength(10);

      builder.Property(u => u.LanguageId)
        .HasColumnName("LanguageID");

      builder.Property(u => u.BusinessUnitId)
        .HasColumnName("BusinessUnitID");

      builder.Property(u => u.Points)
        .HasColumnType("decimal(18,2)");
      builder.Property(u => u.DateModified);

      builder.Property(u => u.DateCreated)
        .IsRequired();

      builder.Property(u => u.IsActive)
        .IsRequired();

      builder.Property(u => u.Branch)
        .HasMaxLength(200);

      builder.Property(u => u.SelectedCountryId)
        .HasColumnName("SelectedCountryID");

      builder.Property(u => u.TimezoneOffsetMins);

      builder.Property(u => u.DebtorId)
        .HasColumnName("DebtorID");

      builder.Property(u => u.DefaultCostCentre)
        .HasMaxLength(100);

      builder.Property(u => u.ExtraInfo)
        .HasColumnType("nvarchar(max)");

      builder.Property(u => u.StoreFlag);

      builder.HasMany(u => u.UserStores)
         .WithOne(us => us.UserProfile)
         .HasForeignKey(us => us.UserName);
   }
}