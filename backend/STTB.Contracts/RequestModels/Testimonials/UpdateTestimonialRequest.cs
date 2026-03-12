using MediatR;
using STTB.Contracts.ResponseModels.Testimonials;

namespace STTB.Contracts.RequestModels.Testimonials;

public class UpdateTestimonialRequest : IRequest<UpdateTestimonialResponse>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Degree { get; set; }
    public string? Photo { get; set; }
    public string? Quote { get; set; }
    public string? Position { get; set; }
    public bool IsFeatured { get; set; }
}
