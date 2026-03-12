using MediatR;
using STTB.Contracts.ResponseModels.Lecturers;

namespace STTB.Contracts.RequestModels.Lecturers;

public class GetLecturersRequest : IRequest<List<GetLecturerResponse>>
{
}
