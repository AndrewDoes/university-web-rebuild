using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers;

public class UpdateNewsHandler : IRequestHandler<UpdateNewsRequest, bool>
{
    private readonly ApplicationDbContext _context;

    public UpdateNewsHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(UpdateNewsRequest request, CancellationToken cancellationToken)
    {
        var news = await _context.News
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (news == null)
        {
            return false;
        }

        news.Title = request.Title;
        news.Slug = request.Slug;
        news.Excerpt = request.Excerpt;
        news.Content = request.Content;
        news.Image = request.Image;
        news.Category = request.Category;
        news.Author = request.Author;
        news.PublishedAt = request.PublishedAt;
        news.Status = request.Status;
        news.Views = request.Views;
        news.Tags = request.Tags;

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}