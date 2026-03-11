using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Events;
using STTB.Contracts.ResponseModels.Events;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class GetUpcomingEventsHandler : IRequestHandler<GetUpcomingEventsRequest, List<GetEventsResponse>>
{
    private readonly ApplicationDbContext _context;

    public GetUpcomingEventsHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<GetEventsResponse>> Handle(GetUpcomingEventsRequest request, CancellationToken cancellationToken)
    {
        return await _context.Events
            .Where(e => e.Status == "upcoming" && e.StartDate >= DateTime.UtcNow)
            .OrderBy(e => e.StartDate)
            .Take(request.Limit)
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