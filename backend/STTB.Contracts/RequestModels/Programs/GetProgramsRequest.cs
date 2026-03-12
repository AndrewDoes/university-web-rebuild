using MediatR;
using STTB.Contracts.ResponseModels.Programs;

namespace STTB.Contracts.RequestModels.Programs
{
    public class GetProgramsRequest : IRequest<List<GetProgramsResponse>>
    {
    }
}