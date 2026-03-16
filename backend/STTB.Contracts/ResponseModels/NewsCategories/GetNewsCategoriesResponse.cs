namespace STTB.Contracts.ResponseModels.NewsCategories;

public class GetNewsCategoriesResponse
{
    public List<NewsCategoryDto> Categories { get; set; } = new();
}
