namespace ZincApi.Entities;

public class Address
{
  public int Id { get; set; }
  public int AddressTypeID { get; set; }
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public string? Phone { get; set; }
  public string? CompanyName { get; set; }
  public string? AddressLine1 { get; set; }
  public string? AddressLine2 { get; set; }
  public string? City { get; set; }
  public int? StateID { get; set; }
  public string? StateCode { get; set; }
  public int? CountryId { get; set; }
  public string? PostCode { get; set; }
  public string? Email { get; set; }

  public State? State { get; set; }
  public Country? Country { get; set; }
}
