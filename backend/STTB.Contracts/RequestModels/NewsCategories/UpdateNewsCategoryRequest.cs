using MediatR;
using STTB.Contracts.ResponseModels.NewsCategories;

namespace STTB.Contracts.RequestModels.NewsCategories;

public class UpdateNewsCategoryRequest : IRequest<UpdateNewsCategoryResponse>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
