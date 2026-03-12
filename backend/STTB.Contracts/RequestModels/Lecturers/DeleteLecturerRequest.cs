using MediatR;
using STTB.Contracts.ResponseModels.Lecturers;

namespace STTB.Contracts.RequestModels.Lecturers;

public class DeleteLecturerRequest : IRequest<DeleteLecturerResponse>
{
    public Guid Id { get; set; }
}
