using MediatR;
using System.Text.Json.Serialization;

namespace STTB.Contracts.RequestModels.News;

public class UpdateNewsRequest : IRequest<bool>
{
    [JsonIgnore]
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? Excerpt { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public string? Category { get; set; }
    public string? Author { get; set; }
    public DateTime? PublishedAt { get; set; }
    public string? Status { get; set; }
    public int Views { get; set; }
    public string? Tags { get; set; }
}