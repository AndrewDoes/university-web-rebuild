namespace STTB.Contracts.RequestModels.Events;

using MediatR;
using STTB.Contracts.ResponseModels.Events;

public class GetEventDetailRequest : IRequest<GetEventDetailResponse>
{
    public Guid Id { get; set; }

    public GetEventDetailRequest(Guid id)
    {
        Id = id;
    }
}