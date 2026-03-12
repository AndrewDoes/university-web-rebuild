using MediatR;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers.News;

public class CreateNewsHandler : IRequestHandler<CreateNewsRequest, CreateNewsResponse>
{
    private readonly ApplicationDbContext _db;

    public CreateNewsHandler(ApplicationDbContext db) => _db = db;

    public async Task<CreateNewsResponse> Handle(CreateNewsRequest request, CancellationToken cancellationToken)
    {
        var slug = string.IsNullOrWhiteSpace(request.Slug) 
            ? STTB.Commons.Helpers.SlugHelper.GenerateSlug(request.Title) 
            : request.Slug;

        var news = new STTB.Entities.Entities.News
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Slug = slug,
            Excerpt = request.Excerpt,
            Content = request.Content,
            Image = request.Image,
            Category = request.Category,
            Author = request.Author,
            PublishedAt = request.PublishedAt,
            Status = request.Status,
            Tags = request.Tags,
            CreatedAt = DateTime.UtcNow
        };

        _db.News.Add(news);
        await _db.SaveChangesAsync(cancellationToken);

        return new CreateNewsResponse
        {
            Id = news.Id,
            Title = news.Title,
            Slug = news.Slug,
            Status = news.Status,
            CreatedAt = news.CreatedAt
        };
    }
}
