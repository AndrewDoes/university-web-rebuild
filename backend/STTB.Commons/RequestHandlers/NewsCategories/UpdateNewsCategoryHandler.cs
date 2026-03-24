using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.NewsCategories;
using STTB.Contracts.ResponseModels.NewsCategories;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.NewsCategories;

public class UpdateNewsCategoryHandler : IRequestHandler<UpdateNewsCategoryRequest, UpdateNewsCategoryResponse>
{
    private readonly ApplicationDbContext _db;

    public UpdateNewsCategoryHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<UpdateNewsCategoryResponse> Handle(UpdateNewsCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await _db.NewsCategories
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (category == null)
        {
            throw new Exception("News category not found");
        }

        category.Name = request.Name;
        category.Slug = GenerateSlug(request.Name);

        await _db.SaveChangesAsync(cancellationToken);

        await NotificationHelper.AddNotificationAsync(
            _db,
            $"Kategori '{category.Name}' berhasil diperbarui",
            "update",
            "news-categories",
            cancellationToken);

        return new UpdateNewsCategoryResponse
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
