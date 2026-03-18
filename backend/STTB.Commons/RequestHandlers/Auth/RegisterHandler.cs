using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.Auth;
using STTB.Contracts.ResponseModels.Auth;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers.Auth;

public class RegisterHandler : IRequestHandler<RegisterRequest, RegisterResponse>
{
    private readonly ApplicationDbContext _db;

    public RegisterHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<RegisterResponse> Handle(RegisterRequest request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLower();

        var existingUser = await _db.UserAccounts
            .FirstOrDefaultAsync(x => x.Email.ToLower() == email, cancellationToken);

        if (existingUser != null)
            throw new Exception("Email sudah terdaftar.");

        var user = new UserAccount
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Email = email,
            Password = PasswordHelper.Hash(request.Password),
            Role = "user",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _db.UserAccounts.Add(user);
        await _db.SaveChangesAsync(cancellationToken);

        return new RegisterResponse
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Message = "Register berhasil."
        };
    }
}