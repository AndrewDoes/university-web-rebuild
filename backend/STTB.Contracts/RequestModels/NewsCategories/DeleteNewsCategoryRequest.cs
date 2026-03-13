using MediatR;

namespace STTB.Contracts.RequestModels.NewsCategories;

public class DeleteNewsCategoryRequest : IRequest<bool>
{
    public Guid Id { get; set; }
}
