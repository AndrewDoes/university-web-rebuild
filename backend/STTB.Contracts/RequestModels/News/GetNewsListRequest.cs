using MediatR;
using STTB.Contracts.ResponseModels.News;

namespace STTB.Contracts.RequestModels.News;

public class GetNewsListRequest : IRequest<GetNewsListResponse>
{
    public int Limit { get; set; } = 10;

    public int Page { get; set; } = 1;
}