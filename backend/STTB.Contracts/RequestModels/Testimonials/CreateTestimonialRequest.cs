using MediatR;

namespace STTB.Contracts.RequestModels.Testimonials;

public class CreateTestimonialRequest : IRequest<Guid>
{
    public string? Name { get; set; }
    public string? Degree { get; set; }
    public string? Photo { get; set; }
    public string? Quote { get; set; }
    public string? Position { get; set; }
    public bool IsFeatured { get; set; }
}