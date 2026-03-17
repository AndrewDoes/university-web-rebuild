using STTB.Contracts.ResponseModels.NewsCategories;

namespace STTB.Contracts.ResponseModels.News;

public class GetNewsDetailResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Excerpt { get; set; }
    public string? Content { get; set; }
    public string? Image { get; set; }
    public Guid CategoryId { get; set; }
    public NewsCategoryDto? Category { get; set; }
    public string Author { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    public string Status { get; set; } = "draft";
    public string? Tags { get; set; }
}