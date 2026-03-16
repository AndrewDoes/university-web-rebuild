using MediatR;
using STTB.Contracts.ResponseModels.NewsCategories;

namespace STTB.Contracts.RequestModels.NewsCategories;

public class GetNewsCategoriesRequest : IRequest<GetNewsCategoriesResponse>
{
}
