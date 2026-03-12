using MediatR;
using STTB.Contracts.ResponseModels.Events;
using System.ComponentModel.DataAnnotations;

namespace STTB.Contracts.RequestModels.Events;

public class GetUpcomingEventsRequest : IRequest<List<GetEventsResponse>>
{
    public int Limit { get; set; } = 4;
}