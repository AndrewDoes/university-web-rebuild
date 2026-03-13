using MediatR;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.News;

public class UpdateNewsHandler : IRequestHandler<UpdateNewsRequest, UpdateNewsResponse>
{
    private readonly ApplicationDbContext _db;

    public UpdateNewsHandler(ApplicationDbContext db) => _db = db;

    public async Task<UpdateNewsResponse> Handle(UpdateNewsRequest request, CancellationToken cancellationToken)
    {
        var news = await _db.News.FindAsync([request.Id], cancellationToken)
            ?? throw new KeyNotFoundException($"News with id {request.Id} not found.");

        news.Title = request.Title;
        if (!string.IsNullOrWhiteSpace(request.Slug))
        {
            news.Slug = request.Slug;
        }
        news.Excerpt = request.Excerpt;
        news.Content = request.Content;
        news.Image = request.Image;
        news.Category = request.Category;
        news.Author = request.Author;
        news.PublishedAt = request.PublishedAt;
        news.Status = request.Status.Trim().ToLower();
        news.Tags = request.Tags;

        await _db.SaveChangesAsync(cancellationToken);

        return new UpdateNewsResponse
        {
            Id = news.Id,
            Title = news.Title,
            Slug = news.Slug,
            Status = news.Status,
            CreatedAt = news.CreatedAt
        };
    }
}
