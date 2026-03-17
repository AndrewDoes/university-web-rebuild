using MediatR;
using STTB.Contracts.ResponseModels.NewsCategories;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers;

public class GetNewsDetailHandler
    : IRequestHandler<GetNewsDetailRequest, GetNewsDetailResponse>
{
    private readonly ApplicationDbContext _context;

    public GetNewsDetailHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<GetNewsDetailResponse> Handle(
        GetNewsDetailRequest request,
        CancellationToken cancellationToken)
    {
        var news = await _context.News
            .Include(x => x.Category)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (news == null)
            return null;

        return new GetNewsDetailResponse
        {
            Id = news.Id,
            Title = news.Title,
            Slug = news.Slug,
            Excerpt = news.Excerpt,
            Content = news.Content,
            Image = news.Image,
            CategoryId = news.CategoryId,
            Category = news.Category != null
                ? new NewsCategoryDto
                {
                    Id = news.Category.Id,
                    Name = news.Category.Name,
                    Slug = news.Category.Slug
                }
                : null,
            Author = news.Author,
            PublishedAt = news.PublishedAt,
            Status = news.Status,
            Tags = news.Tags
        };
    }
}