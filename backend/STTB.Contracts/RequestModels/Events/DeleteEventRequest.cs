using MediatR;

namespace STTB.Contracts.RequestModels.Events;

public class DeleteEventRequest : IRequest<bool>
{
    public Guid Id { get; set; }
}