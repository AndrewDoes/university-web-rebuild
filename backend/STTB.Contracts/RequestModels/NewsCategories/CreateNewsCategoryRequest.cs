using MediatR;
using STTB.Contracts.ResponseModels.NewsCategories;

namespace STTB.Contracts.RequestModels.NewsCategories;

public class CreateNewsCategoryRequest : IRequest<CreateNewsCategoryResponse>
{
    public string Name { get; set; } = string.Empty;
}
