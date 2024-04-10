using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZincApi.Entities;
using ZincApi.Services;

namespace ZincApi.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class StoreController : ControllerBase
{
  private readonly StoreRepository _repository;
  private readonly IStorageService _storageService;

  public StoreController(IStoreRepository repository, IStorageService storageService)
  {
    _repository = (StoreRepository)repository;
    _storageService = storageService;
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

}