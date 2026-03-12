using MediatR;
using STTB.Contracts.ResponseModels.Events;

public class GetEventsQuery : IRequest<List<GetEventsResponse>>
{
}