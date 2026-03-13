using STTB.Contracts.ResponseModels.NewsCategories;

namespace STTB.Contracts.ResponseModels.News;

public class GetNewsDetailResponse
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Content { get; set; }

    public string Image { get; set; }

    public NewsCategoryDto? Category { get; set; }

    public string Author { get; set; }

    public DateTime PublishedAt { get; set; }
}