using Microsoft.EntityFrameworkCore;

namespace ZincApi.Entities;

public class StoreRepository : IStoreRepository
{
  private readonly StoreContext _context;

  public StoreRepository(StoreContext context)
  {
    _context = context;
  }

  public async Task<Store?> GetByIdAsync(int id)
  {
    return await _context.Stores.FindAsync(id);
  }

  public async Task<List<Store>> GetAllAsync()
  {
    return await _context.Stores.ToListAsync();
  }

  public async Task<List<Store>> GetStoresByUser(string userName)
  {
    var userStores = await _context.UserStores
      .Include(us => us.Store)
      .Where(us => us.UserName == userName)
      .Select(us => us.Store)
      .ToListAsync();

    return userStores;
  }

  public async Task<List<StoreStylesheet>> GetStylesheetsByStore(int storeId)
  {
    var stylesheet = await _context.StoreStylesheets
      .Where(ss => ss.StoreId == storeId)
      .ToListAsync();

    return stylesheet;
  }

  public async Task<StoreSetting?> GetSettingByStoreAndName(int storeId, string settingName)
  {
    var setting = await _context.StoreSettings
      .Where(ss => ss.StoreId == storeId && ss.SettingName == settingName)
      .FirstOrDefaultAsync();

    if (setting != null)
    {
      setting.SettingValue = setting.SettingValue
                  .Replace("\r\n", String.Empty) // For Windows line breaks
                  .Replace("\n", String.Empty)   // For Unix/Linux line breaks
                  .Replace("\r", String.Empty);
    }

    return setting;
  }
}