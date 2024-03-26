using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZincApi.Entities;

namespace ZincApi.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class StoreController : ControllerBase
{
   private readonly StoreRepository _repository;

   public StoreController(IStoreRepository repository)
   {
      _repository = (StoreRepository)repository;
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
   
}