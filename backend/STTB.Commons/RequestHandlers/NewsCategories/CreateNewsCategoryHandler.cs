using MediatR;
using STTB.Contracts.RequestModels.NewsCategories;
using STTB.Contracts.ResponseModels.NewsCategories;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.NewsCategories;

public class CreateNewsCategoryHandler : IRequestHandler<CreateNewsCategoryRequest, CreateNewsCategoryResponse>
{
    private readonly ApplicationDbContext _db;

    public CreateNewsCategoryHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<CreateNewsCategoryResponse> Handle(CreateNewsCategoryRequest request, CancellationToken cancellationToken)
    {
        var slug = GenerateSlug(request.Name);
        var category = new STTB.Entities.Entities.NewsCategory
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Slug = slug,
            CreatedAt = DateTime.UtcNow
        };

        _db.NewsCategories.Add(category);
        await _db.SaveChangesAsync(cancellationToken);

        return new CreateNewsCategoryResponse
        {
            Id = category.Id,
            Name = category.Name,
            Slug = category.Slug
        };
    }

    private static string GenerateSlug(string name)
    {
        return name.Trim().ToLower().Replace(" ", "-");
    }
}
