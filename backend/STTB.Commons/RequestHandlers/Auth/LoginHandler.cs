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

public class LoginHandler : IRequestHandler<LoginRequest, LoginResponse>
{
    private readonly ApplicationDbContext _db;
    private readonly IConfiguration _configuration;

    public LoginHandler(ApplicationDbContext db, IConfiguration configuration)
    {
        _db = db;
        _configuration = configuration;
    }

    public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLower();

        var user = await _db.UserAccounts
            .FirstOrDefaultAsync(x => x.Email.ToLower() == email, cancellationToken);

        if (user == null)
            throw new Exception("Email atau password salah.");

        if (!user.IsActive)
            throw new Exception("Akun tidak aktif.");

        var validPassword = PasswordHelper.Verify(request.Password, user.Password);

        if (!validPassword)
            throw new Exception("Email atau password salah.");

        var jwtKey = _configuration["Jwt:Key"]
            ?? throw new Exception("JWT Key belum dikonfigurasi.");

        var jwtIssuer = _configuration["Jwt:Issuer"]
            ?? throw new Exception("JWT Issuer belum dikonfigurasi.");

        var jwtAudience = _configuration["Jwt:Audience"]
            ?? throw new Exception("JWT Audience belum dikonfigurasi.");

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