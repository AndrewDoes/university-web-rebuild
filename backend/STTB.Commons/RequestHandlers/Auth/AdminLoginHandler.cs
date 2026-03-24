using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.Auth;
using STTB.Contracts.ResponseModels.Auth;
using STTB.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace STTB.Commons.RequestHandlers.Auth;

public class AdminLoginHandler : IRequestHandler<AdminLoginRequest, LoginResponse>
{
    private readonly ApplicationDbContext _db;
    private readonly IConfiguration _configuration;

    public AdminLoginHandler(ApplicationDbContext db, IConfiguration configuration)
    {
        _db = db;
        _configuration = configuration;
    }

    public async Task<LoginResponse> Handle(AdminLoginRequest request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLower();

        if (!email.EndsWith("@sttb.com"))
        {
            throw new Exception("Admin email must use the @sttb.com domain.");
        }

        var user = await _db.UserAccounts
            .FirstOrDefaultAsync(x => x.Email.ToLower() == email, cancellationToken);

        if (user == null)
        {
            throw new Exception("Incorrect email or password");
        }

        if (!user.IsActive)
        {
            throw new Exception("Account is inactive.");
        }

        var validPassword = PasswordHelper.Verify(request.Password, user.Password);

        if (!validPassword)
        {
            throw new Exception("Incorrect email or password");
        }

        if (user.Role.Trim().ToLower() != "admin")
        {
            throw new Exception("Access denied. Only admin can login.");
        }

        var jwtKey = _configuration["Jwt:Key"]
            ?? throw new Exception("JWT Key is not configured yet.");

        var jwtIssuer = _configuration["Jwt:Issuer"]
            ?? throw new Exception("JWT Issuer is not configured yet.");

        var jwtAudience = _configuration["Jwt:Audience"]
            ?? throw new Exception("JWT Audience is not configured yet.");

        var expiredAt = DateTime.UtcNow.AddHours(8);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("userId", user.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: expiredAt,
            signingCredentials: creds
        );

        var token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);

        return new LoginResponse
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Token = token,
            ExpiredAt = expiredAt
        };
    }
}