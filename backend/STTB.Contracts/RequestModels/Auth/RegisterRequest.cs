using MediatR;
using STTB.Contracts.ResponseModels.Auth;
using System.ComponentModel.DataAnnotations;

namespace STTB.Contracts.RequestModels.Auth;

public class RegisterRequest : IRequest<RegisterResponse>
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [Compare(nameof(Password))]
    public string ConfirmPassword { get; set; } = string.Empty;
}