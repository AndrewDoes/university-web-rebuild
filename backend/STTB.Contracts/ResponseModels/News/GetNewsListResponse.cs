namespace STTB.Contracts.ResponseModels.News;

public class GetNewsListResponse
{
    public List<NewsDto> News { get; set; } = new();
}

public class NewsDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
}