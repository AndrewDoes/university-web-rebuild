using MediatR;

namespace STTB.Contracts.RequestModels.Events;

public class RegisterEventRequest : IRequest<bool>
{
    public Guid EventId { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string Phone { get; set; }

    public string Church { get; set; }

    public string Notes { get; set; }
}