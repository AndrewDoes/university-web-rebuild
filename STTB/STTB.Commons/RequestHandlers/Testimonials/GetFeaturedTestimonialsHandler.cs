using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Testimonials;
using STTB.Contracts.ResponseModels.Testimonials;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Testimonials
{
    public class GetFeaturedTestimonialsHandler : IRequestHandler<GetFeaturedTestimonialsRequest, List<GetTestimonialsResponse>>
    {
        private readonly ApplicationDbContext _context;

        public GetFeaturedTestimonialsHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetTestimonialsResponse>> Handle(GetFeaturedTestimonialsRequest request, CancellationToken cancellationToken)
        {
            return await _context.Testimonials
                .Where(x => x.IsFeatured)
                .OrderByDescending(x => x.CreatedAt)
                .Take(request.Limit)
                .Select(x => new GetTestimonialsResponse
                {
                    Id = x.Id,
                    Name = x.Name,
                    Degree = x.Degree,
                    Photo = x.Photo,
                    Quote = x.Quote,
                    Position = x.Position
                })
                .ToListAsync();
        }
    }
}