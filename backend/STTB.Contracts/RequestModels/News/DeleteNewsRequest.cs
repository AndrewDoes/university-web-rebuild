using MediatR;
using STTB.Contracts.ResponseModels.News;

namespace STTB.Contracts.RequestModels.News;

public class DeleteNewsRequest : IRequest<DeleteNewsResponse>
{
    public Guid Id { get; set; }
}
