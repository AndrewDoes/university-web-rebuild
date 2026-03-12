using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.ResponseModels.Events;
using STTB.Entities;

public class GetEventsHandler : IRequestHandler<GetEventsQuery, List<GetEventsResponse>>
{
    private readonly ApplicationDbContext _context;

    public GetEventsHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<GetEventsResponse>> Handle(GetEventsQuery request, CancellationToken cancellationToken)
    {
        var upcomingEvents = await _context.Events
            //.Where(e => e.Status != "completed")
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

        if (!upcomingEvents.Any())
        {
            upcomingEvents.Add(new GetEventsResponse
            {
                Message = "No upcoming events"
            });
        }

        return upcomingEvents;
    }
}