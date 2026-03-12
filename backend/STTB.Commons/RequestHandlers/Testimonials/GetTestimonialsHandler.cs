using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Testimonials;
using STTB.Contracts.ResponseModels.Testimonials;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Testimonials
{
    public class GetTestimonialsHandler : IRequestHandler<GetTestimonialsRequest, List<GetTestimonialsResponse>>
    {
        private readonly ApplicationDbContext _context;

        public GetTestimonialsHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetTestimonialsResponse>> Handle(GetTestimonialsRequest request, CancellationToken cancellationToken)
        {
            return await _context.Testimonials
                .OrderByDescending(x => x.CreatedAt)
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