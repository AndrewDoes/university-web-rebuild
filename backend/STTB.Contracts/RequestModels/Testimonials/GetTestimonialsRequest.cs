using MediatR;
using STTB.Contracts.ResponseModels.Testimonials;

namespace STTB.Contracts.RequestModels.Testimonials
{
    public class GetTestimonialsRequest : IRequest<List<GetTestimonialsResponse>>
    {
    }
}