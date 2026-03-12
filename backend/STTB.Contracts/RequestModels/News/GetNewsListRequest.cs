using MediatR;
using STTB.Contracts.ResponseModels.News;

namespace STTB.Contracts.RequestModels.News;

public class GetNewsListRequest : IRequest<GetNewsListResponse>
{
}