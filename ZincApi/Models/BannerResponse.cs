namespace ZincApi.Models;

public record BannerResponse(
  int Id,
  int StoreId,
  int BannerLocationId,
  int LanguageId,
  int SortOrder,
  int? CategoryId,
  int? GroupBuyId,
  string Image,
  string? MobileImage,
  string? TargetUrl,
  DateTime? DateStart,
  DateTime? DateEnd,
  DateTime DateModified,
  bool IsMovie,
  bool IsActive,
  string ImageUrl);