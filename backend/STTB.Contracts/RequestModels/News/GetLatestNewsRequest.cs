using MediatR;
using STTB.Contracts.ResponseModels.News;

namespace STTB.Contracts.RequestModels.News;

public class GetLatestNewsRequest : IRequest<GetLatestNewsResponse>
{
    public int Limit { get; set; } = 6;
}