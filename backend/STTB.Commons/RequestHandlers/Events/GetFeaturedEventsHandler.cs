using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Events;
using STTB.Contracts.ResponseModels.Events;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class GetFeaturedEventsHandler : IRequestHandler<GetFeaturedEventsRequest, List<GetEventsResponse>>
{
    private readonly ApplicationDbContext _context;

    public GetFeaturedEventsHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<GetEventsResponse>> Handle(GetFeaturedEventsRequest request, CancellationToken cancellationToken)
    {
        return await _context.Events
            .Where(e => e.IsFeatured)
            .OrderByDescending(e => e.StartDate)
            .Select(e => new GetEventsResponse
            {
                Id = e.Id,
                Title = e.Title,
                Image = e.Image,
                StartDate = e.StartDate,
                Time = e.Time,
                Location = e.Location,
                Price = e.Price
            })
            .ToListAsync();
    }
}