using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Lecturers;
using STTB.Contracts.ResponseModels.Lecturers;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Lecturers;

public class GetLecturersHandler : IRequestHandler<GetLecturersRequest, List<GetLecturerResponse>>
{
    private readonly ApplicationDbContext _db;

    public GetLecturersHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<GetLecturerResponse>> Handle(GetLecturersRequest request, CancellationToken cancellationToken)
    {
        return await _db.Lecturers
            .OrderBy(x => x.Name)
            .Select(x => new GetLecturerResponse
            {
                Id = x.Id,
                Name = x.Name,
                Position = x.Position,
                Description = x.Description,
                Photo = x.Photo,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync(cancellationToken);
    }
}
