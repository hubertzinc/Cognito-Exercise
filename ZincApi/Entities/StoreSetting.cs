namespace ZincApi.Entities;

public class StoreSetting
{
  public int StoreId { get; set; }
  public string SettingName { get; set; } = string.Empty;
  public string SettingValue { get; set; } = string.Empty;
  public bool DigitalOnly { get; set; }
}