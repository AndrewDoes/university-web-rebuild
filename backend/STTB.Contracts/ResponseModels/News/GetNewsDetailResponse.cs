namespace STTB.Contracts.ResponseModels.News;

public class GetNewsDetailResponse
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Slug { get; set; }

    public string Content { get; set; }

    public string Excerpt { get; set; }

    public string Image { get; set; }

    public string Category { get; set; }

    public string Author { get; set; }

    public string Status { get; set; }

    public DateTime PublishedAt { get; set; }
}