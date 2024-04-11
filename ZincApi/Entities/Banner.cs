namespace ZincApi.Entities;

public class Banner
{
  public int Id { get; set; }
  public int StoreId { get; set; }
  public int BannerLocationId { get; set; }
  public int LanguageId { get; set; }
  public int SortOrder { get; set; } = 0;
  public int? CategoryId { get; set; }
  public int? GroupBuyId { get; set; }
  public string Image { get; set; } = string.Empty;
  public string? MobileImage { get; set; } = string.Empty;
  public string? TargetUrl { get; set; }
  public DateTime? DateStart { get; set; }
  public DateTime? DateEnd { get; set; }
  public DateTime DateModified { get; set; } = DateTime.UtcNow;
  public bool IsMovie { get; set; } = false;
  public bool IsActive { get; set; } = true;
}