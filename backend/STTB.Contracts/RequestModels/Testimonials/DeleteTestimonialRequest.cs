using MediatR;
using STTB.Contracts.ResponseModels.Testimonials;

namespace STTB.Contracts.RequestModels.Testimonials;

public class DeleteTestimonialRequest : IRequest<DeleteTestimonialResponse>
{
    public Guid Id { get; set; }
}
