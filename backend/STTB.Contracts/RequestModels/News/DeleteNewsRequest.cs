using MediatR;

namespace STTB.Contracts.RequestModels.News;

public class DeleteNewsRequest : IRequest<bool>
{
    public Guid Id { get; set; }
}