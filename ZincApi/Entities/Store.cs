namespace ZincApi.Entities;

public class Store
{
   public int Id { get; set; }
   public int ClientId { get; set; }
   public string Name { get; set; } = string.Empty;
   public string Area { get; set; } = string.Empty;
   public string Url { get; set; } = string.Empty;
   public string? TestSiteUrl { get; set; }
}