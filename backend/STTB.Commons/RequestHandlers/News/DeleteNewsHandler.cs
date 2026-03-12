using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers;

public class DeleteNewsHandler : IRequestHandler<DeleteNewsRequest, bool>
{
    private readonly ApplicationDbContext _context;

    public DeleteNewsHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(DeleteNewsRequest request, CancellationToken cancellationToken)
    {
        var news = await _context.News
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (news == null)
        {
            return false;
        }

        _context.News.Remove(news);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}