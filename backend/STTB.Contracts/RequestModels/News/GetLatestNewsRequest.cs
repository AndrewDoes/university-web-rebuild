using MediatR;
using STTB.Contracts.ResponseModels.News;
using System.ComponentModel.DataAnnotations;

namespace STTB.Contracts.RequestModels.News;

public class GetLatestNewsRequest : IRequest<GetLatestNewsResponse>
{
    [Range(1, 50, ErrorMessage = "Limit must be between 1 and 50")]
    public int Limit { get; set; } = 6;
}