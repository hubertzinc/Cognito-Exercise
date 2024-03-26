using System.ComponentModel.DataAnnotations;

namespace ZincApi.Entities;

public class UserProfile
{
   [Key]
   public string UserName { get; set; } = string.Empty!;
   public string Email { get; set; } = string.Empty!;
   public string? PhoneNumber { get; set; }
   public bool PhoneNumberConfirmed { get; set; }
   public int? CurrencyId { get; set; }
   public string? FirstName { get; set; }
   public string? LastName { get; set; }
   public int? ShippingAddressId { get; set; }
   public int? BillingAddressId { get; set; }
   public int? Age { get; set; }
   public string? Gender { get; set; }
   public int? LanguageId { get; set; }
   public int? BusinessUnitId { get; set; }
   public decimal? Points { get; set; }
   public DateTimeOffset? DateModified { get; set; }
   public DateTimeOffset DateCreated { get; set; }
   public bool IsActive { get; set; }
   public string? Branch { get; set; }
   public int? SelectedCountryId { get; set; }
   public int? TimezoneOffsetMins { get; set; }
   public int? DebtorId { get; set; }
   public string? DefaultCostCentre { get; set; }
   public string? ExtraInfo { get; set; }
   public bool? StoreFlag { get; set; }

   public List<UserStore> UserStores { get; set; } = new List<UserStore>();
}