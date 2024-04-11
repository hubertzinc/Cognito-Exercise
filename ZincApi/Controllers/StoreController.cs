using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZincApi.Entities;
using ZincApi.Models;
using ZincApi.Services;

namespace ZincApi.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class StoreController : ControllerBase
{
  private readonly IStoreRepository _repository;
  private readonly IStorageService _storageService;
  private readonly IBannerRepository _bannerRepository;
  private readonly IUserRepository _userRepository;

  public StoreController(
    IStoreRepository repository,
    IStorageService storageService,
    IBannerRepository bannerRepository,
    IUserRepository userRepository)
  {
    _repository = (StoreRepository)repository;
    _storageService = storageService;
    _bannerRepository = bannerRepository;
    _userRepository = userRepository;
  }

  [HttpGet(Name = "GetStores")]
  public async Task<ActionResult<List<Store>>> GetStores()
  {
    var stores = await _repository.GetAllAsync();
    return Ok(stores);
  }

  [HttpGet("{id}", Name = "GetStore")]
  public async Task<ActionResult<Store>> GetStore(int id)
  {
    var store = await _repository.GetByIdAsync(id);
    if (store == null)
    {
      return NotFound();
    }
    return Ok(store);
  }

  [HttpGet("user/{userName}", Name = "GetStoresByUser")]
  public async Task<ActionResult<List<Store>>> GetStoresByUser(string userName)
  {
    var stores = await _repository.GetStoresByUser(userName);
    return Ok(stores);
  }

  [AllowAnonymous]
  [HttpGet("{storeId}/logo", Name = "GetStoreLogo")]
  public async Task<ActionResult<string>> GetStoreLogo(int storeId)
  {
    var store = await _repository.GetByIdAsync(storeId);
    if (store == null)
    {
      return NotFound();
    }

    if (string.IsNullOrEmpty(store.LogoImage))
    {
      return Ok("");
    }
    
    var blobUri = _storageService.GetBlobUri(store.Area.ToLower(), $"Misc/{store.LogoImage}");
    
    return Ok(new { Url = blobUri});
  }

  [AllowAnonymous]
  [HttpGet("{storeId}/settings/{settingName}", Name = "GetStoreSettingByName")]
  public async Task<ActionResult<StoreSetting>> GetStoreSettingByName(int storeId, string settingName)
  {
    var setting = await _repository.GetSettingByStoreAndName(storeId, settingName);
    if (setting == null)
    {
      return NotFound();
    }
    return Ok(setting);
  }

  [HttpGet("{storeId}/banners/for/{location}", Name = "GetBannersByLocation")]
  public async Task<ActionResult<List<Banner>>> GetBannersByLocation(int storeId, int location)
  {
    var banners = await _bannerRepository.GetBannersByStoreAndLocation(storeId, 1);
    var store = await _repository.GetByIdAsync(storeId);

    if (store == null)
    {
      return StatusCode(500, "Store not found");
    }

    var bannerList = new List<BannerResponse>();

    foreach (var banner in banners)
    {
      string imageUrl = _storageService.GetBlobUri(store.Area.ToLower(), $"Banners/{banner.Image}");

      var bannerResponse = new BannerResponse(
        banner.Id,
        banner.StoreId,
        banner.BannerLocationId,
        banner.LanguageId,
        banner.SortOrder,
        banner.CategoryId,
        banner.GroupBuyId,
        banner.Image,
        banner.MobileImage,
        banner.TargetUrl,
        banner.DateStart,
        banner.DateEnd,
        banner.DateModified,
        banner.IsMovie,
        banner.IsActive,
        imageUrl
      );

      bannerList.Add(bannerResponse);
    }

    return Ok(bannerList);
  }

  [AllowAnonymous]
  [HttpGet("{storeId}/stylesheets", Name = "GetStylesheetsByStore")]
  public async Task<ActionResult<List<StoreStylesheet>>> GetStoreStylesheets(int storeId)
  {
    var stylesheets = await _repository.GetStylesheetsByStore(storeId);
    return Ok(stylesheets);
  }

  [AllowAnonymous]
  [HttpGet("{storeId}/hasaccess/{email}", Name = "UserHasAccessToStore")]
  public async Task<ActionResult<bool>> UserHasAccessToStore(int storeId, string email)
  {
    var hasAccess = await _userRepository.UserHasStoreAsync(email, storeId);
    return Ok(new { HasAccess = hasAccess });
  }


}