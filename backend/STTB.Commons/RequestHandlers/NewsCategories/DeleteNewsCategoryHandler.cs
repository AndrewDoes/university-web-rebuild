using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.NewsCategories;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.NewsCategories;

public class DeleteNewsCategoryHandler : IRequestHandler<DeleteNewsCategoryRequest, bool>
{
    private readonly ApplicationDbContext _db;

    public DeleteNewsCategoryHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<bool> Handle(DeleteNewsCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await _db.NewsCategories
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (category == null)
        {
            return false;
        }

        var categoryName = category.Name;

        _db.NewsCategories.Remove(category);
        await _db.SaveChangesAsync(cancellationToken);

        await NotificationHelper.AddNotificationAsync(
            _db,
            $"Kategori '{categoryName}' berhasil dihapus",
            "delete",
            "news-categories",
            cancellationToken);

        return true;
    }
}
