using Microsoft.EntityFrameworkCore;

namespace ZincApi.Entities;

public class BannerRepository : IBannerRepository
{
  private readonly StoreContext _context;

  public BannerRepository(StoreContext context)
  {
    _context = context;
  }

  public async Task<List<Banner>> GetBannersByStore(int storeId)
  {
    return await _context.Banners
      .Where(b => b.StoreId == storeId)
      .ToListAsync();
  }

  public async Task<Banner?> GetBannerById(int id)
  {
    return await _context.Banners
      .FirstOrDefaultAsync(b => b.Id == id);
  }

  public async Task<List<Banner>> GetBannersByStoreAndLocation(int storeId, int locationId)
  {
    return await _context.Banners
      .Where(b => b.StoreId == storeId && b.BannerLocationId == locationId)
      .ToListAsync();
  }

  public async Task<Banner> CreateBanner(Banner banner)
  {
    _context.Banners.Add(banner);
    await _context.SaveChangesAsync();
    return banner;
  }

  public async Task<Banner> UpdateBanner(Banner banner)
  {
    _context.Banners.Update(banner);
    await _context.SaveChangesAsync();
    return banner;
  }

}
