using MediatR;
using STTB.Contracts.RequestModels.News;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers;

public class CreateNewsHandler : IRequestHandler<CreateNewsRequest, Guid>
{
    private readonly ApplicationDbContext _context;

    public CreateNewsHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateNewsRequest request, CancellationToken cancellationToken)
    {
        var news = new STTB.Entities.Entities.News
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Slug = request.Slug,
            Excerpt = request.Excerpt,
            Content = request.Content,
            Image = request.Image,
            Category = request.Category,
            Author = request.Author,
            PublishedAt = request.PublishedAt,
            Status = request.Status,
            Views = request.Views,
            Tags = request.Tags,
            CreatedAt = DateTime.Now
        };

        _context.News.Add(news);
        await _context.SaveChangesAsync(cancellationToken);

        return news.Id;
    }
}