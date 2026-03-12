using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Events;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class DeleteEventHandler : IRequestHandler<DeleteEventRequest, bool>
{
    private readonly ApplicationDbContext _context;

    public DeleteEventHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(DeleteEventRequest request, CancellationToken cancellationToken)
    {
        var eventData = await _context.Events
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (eventData == null)
        {
            return false;
        }

        _context.Events.Remove(eventData);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}