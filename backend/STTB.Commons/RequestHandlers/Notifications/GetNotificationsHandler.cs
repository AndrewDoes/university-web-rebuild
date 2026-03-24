using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Notifications;
using STTB.Contracts.ResponseModels.Notifications;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Notifications
{
    public class GetNotificationsHandler : IRequestHandler<GetNotificationsRequest, List<GetNotificationsResponse>>
    {
        private readonly ApplicationDbContext _db;

        public GetNotificationsHandler(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<GetNotificationsResponse>> Handle(GetNotificationsRequest request, CancellationToken cancellationToken)
        {
            var limit = request.Limit <= 0 ? 10 : request.Limit;

            var notifications = await _db.Notifications
                .OrderByDescending(x => x.CreatedAt)
                .Take(limit)
                .Select(x => new GetNotificationsResponse
                {
                    Id = x.Id,
                    Message = x.Message,
                    Type = x.Type,
                    Module = x.Module,
                    CreatedAt = x.CreatedAt
                })
                .ToListAsync(cancellationToken);

            return notifications;
        }
    }
}