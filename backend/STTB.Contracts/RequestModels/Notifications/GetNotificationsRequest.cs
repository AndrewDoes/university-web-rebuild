using MediatR;
using STTB.Contracts.ResponseModels.Notifications;

namespace STTB.Contracts.RequestModels.Notifications
{
    public class GetNotificationsRequest : IRequest<List<GetNotificationsResponse>>
    {
        public int Limit { get; set; } = 10;
    }
}