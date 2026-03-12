using MediatR;
using STTB.Contracts.ResponseModels.Testimonials;
using System.ComponentModel.DataAnnotations;

namespace STTB.Contracts.RequestModels.Testimonials
{
    public class GetFeaturedTestimonialsRequest : IRequest<List<GetTestimonialsResponse>>
    {
        public int Limit { get; set; } = 4;
    }
}