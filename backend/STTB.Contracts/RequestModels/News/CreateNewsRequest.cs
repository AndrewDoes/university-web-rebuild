using MediatR;
using STTB.Contracts.ResponseModels.News;

namespace STTB.Contracts.RequestModels.News;

public class CreateNewsRequest : IRequest<CreateNewsResponse>
{
    public string Title { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? Excerpt { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public Guid CategoryId { get; set; }
    public string Author { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    public string Status { get; set; } = "draft";
    public string? Tags { get; set; }
}
