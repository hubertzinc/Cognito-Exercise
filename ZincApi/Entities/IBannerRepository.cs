namespace ZincApi.Entities;

public interface IBannerRepository
{
  Task<List<Banner>> GetBannersByStore(int storeId);
  Task<Banner?> GetBannerById(int id);
  Task<List<Banner>> GetBannersByStoreAndLocation(int storeId, int locationId);
  Task<Banner> CreateBanner(Banner banner);
  Task<Banner> UpdateBanner(Banner banner);
}