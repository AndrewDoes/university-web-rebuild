using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Events;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class RegisterEventHandler : IRequestHandler<RegisterEventRequest, bool>
{
    private readonly ApplicationDbContext _context;

    public RegisterEventHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(RegisterEventRequest request, CancellationToken cancellationToken)
    {
        var eventData = await _context.Events
            .FirstOrDefaultAsync(e => e.Id == request.EventId);

        if (eventData == null)
            return false;

        var registration = new EventRegistration
        {
            Id = Guid.NewGuid(),
            EventId = request.EventId,
            Name = request.Name,
            Email = request.Email,
            Phone = request.Phone,
            Church = request.Church,
            Notes = request.Notes,
            RegisteredAt = DateTime.UtcNow,
            PaymentStatus = "pending"
        };

        _context.EventRegistrations.Add(registration);

        await _context.SaveChangesAsync();

        return true;
    }
}