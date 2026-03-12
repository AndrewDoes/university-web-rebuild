using MediatR;
using STTB.Contracts.ResponseModels.Lecturers;

namespace STTB.Contracts.RequestModels.Lecturers;

public class CreateLecturerRequest : IRequest<CreateLecturerResponse>
{
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Photo { get; set; }
}
