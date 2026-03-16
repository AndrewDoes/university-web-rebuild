namespace STTB.Contracts.ResponseModels.NewsCategories;

public class CreateNewsCategoryResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
}
