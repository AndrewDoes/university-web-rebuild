using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Events;
using STTB.Contracts.ResponseModels.Events;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class GetEventDetailHandler : IRequestHandler<GetEventDetailRequest, GetEventDetailResponse>
{
    private readonly ApplicationDbContext _context;

    public GetEventDetailHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<GetEventDetailResponse> Handle(GetEventDetailRequest request, CancellationToken cancellationToken)
    {
        var eventData = await _context.Events
            .Where(e => e.Id == request.Id)
            .Select(e => new GetEventDetailResponse
            {
                Id = e.Id,
                Title = e.Title,
                Description = e.Description,
                Content = e.Content,
                Image = e.Image,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                Time = e.Time,
                Location = e.Location,
                Speakers = e.Speakers,
                Agenda = e.Agenda,
                Price = e.Price
            })
            .FirstOrDefaultAsync();

        return eventData;
    }
}