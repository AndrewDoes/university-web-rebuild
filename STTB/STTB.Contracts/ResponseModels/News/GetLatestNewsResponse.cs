using System.Text.Json.Serialization;

namespace STTB.Contracts.ResponseModels.News;

public class GetLatestNewsResponse
{
    public List<LatestNewsItem> News { get; set; }
}

public class LatestNewsItem
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Excerpt { get; set; }

    public string Image { get; set; }

    [JsonPropertyName("publishedAt")]
    public DateTime PublishedAt { get; set; }
}