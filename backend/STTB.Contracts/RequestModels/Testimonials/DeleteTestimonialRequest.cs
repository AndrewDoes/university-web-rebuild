using MediatR;

namespace STTB.Contracts.RequestModels.Testimonials;

public class DeleteTestimonialRequest : IRequest<bool>
{
    public Guid Id { get; set; }
}