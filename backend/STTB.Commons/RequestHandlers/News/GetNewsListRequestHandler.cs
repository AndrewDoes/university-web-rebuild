using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.News;

public class GetNewsListRequestHandler : IRequestHandler<GetNewsListRequest, GetNewsListResponse>
{
    private readonly ApplicationDbContext _db;

    public GetNewsListRequestHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<GetNewsListResponse> Handle(GetNewsListRequest request, CancellationToken cancellationToken)
    {
        var news = await _db.News
            .Where(x => x.Status == "published")
            .OrderByDescending(x => x.PublishedAt)
            .Skip((request.Page - 1) * request.Limit)
            .Take(request.Limit)
            .Select(x => new NewsDto
            {
                Id = x.Id,
                Title = x.Title,
                Excerpt = x.Excerpt ?? "",
                Image = x.Image ?? "",
                PublishedAt = x.PublishedAt
            })
            .ToListAsync(cancellationToken);

        return new GetNewsListResponse
        {
            News = news
        };
    }
}