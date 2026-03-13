using MediatR;
using STTB.Contracts.ResponseModels.Events;

namespace STTB.Contracts.RequestModels.Events;

public class UpdateEventRequest : IRequest<UpdateEventResponse>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? Description { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Time { get; set; }
    public string? Location { get; set; }
    public string? Speakers { get; set; }
    public string? Agenda { get; set; }
    public string? Price { get; set; }
    public bool IsFeatured { get; set; }
    public string Status { get; set; } = "upcoming";
    public int? MaxParticipants { get; set; }
    public DateTime? RegistrationDeadline { get; set; }
}
