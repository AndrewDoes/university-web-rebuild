using MediatR;
using STTB.Contracts.ResponseModels.Lecturers;

namespace STTB.Contracts.RequestModels.Lecturers;

public class GetLecturerDetailRequest : IRequest<GetLecturerResponse?>
{
    public Guid Id { get; set; }
}
