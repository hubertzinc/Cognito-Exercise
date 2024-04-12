namespace ZincApi.Entities;

public class State
{
  public int Id { get; set; }
  public int CountryId { get; set; }
  public string Name { get; set; } = string.Empty!;
  public int? SortOrder { get; set; }
  public string? LongName { get; set; }
}