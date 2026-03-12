using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers;

public class GetLatestNewsHandler
    : IRequestHandler<GetLatestNewsRequest, GetLatestNewsResponse>
{
    private readonly ApplicationDbContext _context;

    public GetLatestNewsHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<GetLatestNewsResponse> Handle(GetLatestNewsRequest request, CancellationToken cancellationToken)
    {
        var news = await _context.News
            .OrderByDescending(x => x.PublishedAt)
            .Take(request.Limit)
            .Select(x => new LatestNewsItem
            {
                Id = x.Id,
                Title = x.Title,
                Excerpt = x.Excerpt,
                Image = x.Image,
                PublishedAt = x.PublishedAt
            })
            .ToListAsync(cancellationToken);

        return new GetLatestNewsResponse
        {
            News = news
        };
    }
}