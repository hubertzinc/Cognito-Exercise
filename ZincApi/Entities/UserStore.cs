using System.ComponentModel.DataAnnotations;

namespace ZincApi.Entities;

public class UserStore
{
   [Key]
   public string UserName { get; set; } = string.Empty!;
   [Key]
   public int StoreId { get; set; }
   public UserProfile UserProfile { get; set; } = null!;
   public Store Store { get; set; } = null!;
}