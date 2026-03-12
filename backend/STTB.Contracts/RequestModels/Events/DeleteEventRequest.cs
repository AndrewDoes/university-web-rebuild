using MediatR;
using STTB.Contracts.ResponseModels.Events;

namespace STTB.Contracts.RequestModels.Events;

public class DeleteEventRequest : IRequest<DeleteEventResponse>
{
    public Guid Id { get; set; }
}
