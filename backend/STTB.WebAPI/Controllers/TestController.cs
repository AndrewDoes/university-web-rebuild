using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STTB.Entities;

namespace STTB.WebAPI.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public TestController(ApplicationDbContext db)
    {
        _db = db;
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        return Ok(new
        {
            message = "Token valid",
            name = User.Identity?.Name,
            role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value
        });
    }

    [AllowAnonymous]
    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new
        {
            status = "ok",
            message = "API is running"
        });
    }

    [AllowAnonymous]
    [HttpGet("db-health")]
    public async Task<IActionResult> DatabaseHealth()
    {
        try
        {
            var canConnect = await _db.Database.CanConnectAsync();

            if (!canConnect)
            {
                return StatusCode(503, new
                {
                    status = "error",
                    message = "Database connection failed"
                });
            }

            return Ok(new
            {
                status = "ok",
                message = "Database connected"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(503, new
            {
                status = "error",
                message = "Database connection failed",
                detail = ex.Message
            });
        }
    }
}