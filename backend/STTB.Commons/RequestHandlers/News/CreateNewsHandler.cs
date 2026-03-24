using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.News;

public class CreateNewsHandler : IRequestHandler<CreateNewsRequest, CreateNewsResponse>
{
    private readonly ApplicationDbContext _db;

    public CreateNewsHandler(ApplicationDbContext db) => _db = db;

    public async Task<CreateNewsResponse> Handle(CreateNewsRequest request, CancellationToken cancellationToken)
    {
        var slug = !string.IsNullOrWhiteSpace(request.Slug)
            ? request.Slug.Trim().ToLower()
            : GenerateSlug(request.Title);

        var originalSlug = slug;
        var counter = 1;

        while (await _db.News.AnyAsync(x => x.Slug == slug, cancellationToken))
        {
            slug = $"{originalSlug}-{counter}";
            counter++;
        }

        var news = new STTB.Entities.Entities.News
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Slug = slug,
            Excerpt = request.Excerpt,
            Content = request.Content,
            Image = request.Image,
            CategoryId = request.CategoryId,
            Author = request.Author,
            PublishedAt = request.PublishedAt,
            Status = request.Status.Trim().ToLower(),
            Tags = request.Tags,
            CreatedAt = DateTime.UtcNow
        };

        _db.News.Add(news);
        await _db.SaveChangesAsync(cancellationToken);

        await NotificationHelper.AddNotificationAsync(
            _db,
            $"Berita '{news.Title}' berhasil ditambahkan",
            "create",
            "news",
            cancellationToken);

        return new CreateNewsResponse
        {
            Id = news.Id,
            Title = news.Title,
            Slug = news.Slug,
            Status = news.Status,
            CreatedAt = news.CreatedAt
        };
    }

    private static string GenerateSlug(string title)
    {
        return title.Trim().ToLower().Replace(" ", "-");
    }
}