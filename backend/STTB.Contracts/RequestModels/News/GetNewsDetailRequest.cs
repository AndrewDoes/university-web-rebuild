using MediatR;
using STTB.Contracts.ResponseModels.News;

namespace STTB.Contracts.RequestModels.News;

public class GetNewsDetailRequest : IRequest<GetNewsDetailResponse>
{
    public Guid Id { get; set; }
}