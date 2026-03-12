using MediatR;
using System.Text.Json.Serialization;

namespace STTB.Contracts.RequestModels.Testimonials;

public class UpdateTestimonialRequest : IRequest<bool>
{
    [JsonIgnore]
    public Guid Id { get; set; }

    public string? Name { get; set; }
    public string? Degree { get; set; }
    public string? Photo { get; set; }
    public string? Quote { get; set; }
    public string? Position { get; set; }
    public bool IsFeatured { get; set; }
}