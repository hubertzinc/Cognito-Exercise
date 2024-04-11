using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZincApi.Entities;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
  private readonly IUserRepository _repository;

  public UserController(IUserRepository repository)
  {
    _repository = repository;
  }

  [HttpGet("{username}", Name = "GetByUserName")]
  public async Task<ActionResult<UserProfile>> GetByUserName(string username)
  {
    var user = await _repository.GetByUsernameAsync(username);
    if (user == null)
    {
      return NotFound();
    }
    return Ok(user);
  }
}