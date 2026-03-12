using MediatR;
using STTB.Contracts.RequestModels.Events;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class CreateEventHandler : IRequestHandler<CreateEventRequest, Guid>
{
    private readonly ApplicationDbContext _context;

    public CreateEventHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateEventRequest request, CancellationToken cancellationToken)
    {
        var eventData = new Event
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Slug = request.Slug,
            Description = request.Description,
            Content = request.Content,
            Image = request.Image,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Time = request.Time,
            Location = request.Location,
            Speakers = request.Speakers,
            Agenda = request.Agenda,
            Price = request.Price,
            IsFeatured = request.IsFeatured,
            Status = request.Status,
            MaxParticipants = request.MaxParticipants,
            RegistrationDeadline = request.RegistrationDeadline,
            CreatedAt = DateTime.UtcNow
        };

        _context.Events.Add(eventData);
        await _context.SaveChangesAsync(cancellationToken);

        return eventData.Id;
    }
}