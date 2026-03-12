using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Events;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class UpdateEventHandler : IRequestHandler<UpdateEventRequest, bool>
{
    private readonly ApplicationDbContext _context;

    public UpdateEventHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(UpdateEventRequest request, CancellationToken cancellationToken)
    {
        var eventData = await _context.Events
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (eventData == null)
        {
            return false;
        }

        eventData.Title = request.Title;
        eventData.Slug = request.Slug;
        eventData.Description = request.Description;
        eventData.Content = request.Content;
        eventData.Image = request.Image;
        eventData.StartDate = request.StartDate;
        eventData.EndDate = request.EndDate;
        eventData.Time = request.Time;
        eventData.Location = request.Location;
        eventData.Speakers = request.Speakers;
        eventData.Agenda = request.Agenda;
        eventData.Price = request.Price;
        eventData.IsFeatured = request.IsFeatured;
        eventData.Status = request.Status;
        eventData.MaxParticipants = request.MaxParticipants;
        eventData.RegistrationDeadline = request.RegistrationDeadline;

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}