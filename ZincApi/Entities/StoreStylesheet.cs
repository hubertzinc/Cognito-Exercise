namespace ZincApi.Entities;

public class StoreStylesheet
{
  public int Id { get; set; }
  public int StoreId { get; set; }
  public string Link { get; set; } = string.Empty;
}