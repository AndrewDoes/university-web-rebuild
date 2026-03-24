using MediatR;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.Events;
using STTB.Contracts.ResponseModels.Events;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class DeleteEventHandler : IRequestHandler<DeleteEventRequest, DeleteEventResponse>
{
    private readonly ApplicationDbContext _db;

    public DeleteEventHandler(ApplicationDbContext db) => _db = db;

    public async Task<DeleteEventResponse> Handle(DeleteEventRequest request, CancellationToken cancellationToken)
    {
        var ev = await _db.Events.FindAsync([request.Id], cancellationToken);

        if (ev is null)
            return new DeleteEventResponse { Success = false, Message = "Event not found." };

        var eventTitle = ev.Title;

        _db.Events.Remove(ev);
        await _db.SaveChangesAsync(cancellationToken);

        await NotificationHelper.AddNotificationAsync(
            _db,
            $"Event '{eventTitle}' berhasil dihapus",
            "delete",
            "events",
            cancellationToken);

        return new DeleteEventResponse { Success = true, Message = "Event deleted successfully." };
    }
}
