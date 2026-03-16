using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.NewsCategories;
using STTB.Contracts.ResponseModels.NewsCategories;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.NewsCategories;

public class GetNewsCategoriesHandler : IRequestHandler<GetNewsCategoriesRequest, GetNewsCategoriesResponse>
{
    private readonly ApplicationDbContext _db;

    public GetNewsCategoriesHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<GetNewsCategoriesResponse> Handle(GetNewsCategoriesRequest request, CancellationToken cancellationToken)
    {
        var categories = await _db.NewsCategories
            .OrderBy(x => x.Name)
            .Select(x => new NewsCategoryDto
            {
                Id = x.Id,
                Name = x.Name,
                Slug = x.Slug
            })
            .ToListAsync(cancellationToken);

        return new GetNewsCategoriesResponse
        {
            Categories = categories
        };
    }
}
