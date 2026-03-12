using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers;

public class GetNewsDetailHandler : IRequestHandler<GetNewsDetailRequest, GetNewsDetailResponse>
{
    private readonly ApplicationDbContext _context;

    public GetNewsDetailHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<GetNewsDetailResponse> Handle(GetNewsDetailRequest request, CancellationToken cancellationToken)
    {
        var news = await _context.News
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (news == null)
        {
            return null;
        }

        return new GetNewsDetailResponse
        {
            Id = news.Id,
            Title = news.Title,
            Content = news.Content,
            Image = news.Image,
            Category = news.Category,
            Author = news.Author,
            PublishedAt = news.PublishedAt
        };
    }
}