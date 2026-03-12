using MediatR;
using STTB.Contracts.ResponseModels.Events;

namespace STTB.Contracts.RequestModels.Events;

public class GetFeaturedEventsRequest : IRequest<List<GetEventsResponse>>
{
}