using MediatR;
using STTB.Contracts.ResponseModels.Auth;
using System.ComponentModel.DataAnnotations;

namespace STTB.Contracts.RequestModels.Auth;

public class AdminLoginRequest : IRequest<LoginResponse>
{
    [Required]
    [EmailAddress]
    [RegularExpression(@"^[^@\s]+@sttb\.com$", ErrorMessage = "Admin email must use the @sttb.com domain.")]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}