using MediatR;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.News;

public class DeleteNewsHandler : IRequestHandler<DeleteNewsRequest, DeleteNewsResponse>
{
    private readonly ApplicationDbContext _db;

    public DeleteNewsHandler(ApplicationDbContext db) => _db = db;

    public async Task<DeleteNewsResponse> Handle(DeleteNewsRequest request, CancellationToken cancellationToken)
    {
        var news = await _db.News.FindAsync([request.Id], cancellationToken);

        if (news is null)
            return new DeleteNewsResponse { Success = false, Message = "News not found." };

        _db.News.Remove(news);
        await _db.SaveChangesAsync(cancellationToken);

        return new DeleteNewsResponse { Success = true, Message = "News deleted successfully." };
    }
}
