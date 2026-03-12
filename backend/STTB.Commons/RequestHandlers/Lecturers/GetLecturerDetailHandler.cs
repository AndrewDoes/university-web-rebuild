using MediatR;
using STTB.Contracts.RequestModels.Lecturers;
using STTB.Contracts.ResponseModels.Lecturers;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Lecturers;

public class GetLecturerDetailHandler : IRequestHandler<GetLecturerDetailRequest, GetLecturerResponse?>
{
    private readonly ApplicationDbContext _db;

    public GetLecturerDetailHandler(ApplicationDbContext db) => _db = db;

    public async Task<GetLecturerResponse?> Handle(GetLecturerDetailRequest request, CancellationToken cancellationToken)
    {
        var lecturer = await _db.Lecturers.FindAsync([request.Id], cancellationToken);
        if (lecturer is null) return null;

        return new GetLecturerResponse
        {
            Id = lecturer.Id,
            Name = lecturer.Name,
            Position = lecturer.Position,
            Description = lecturer.Description,
            Photo = lecturer.Photo,
            CreatedAt = lecturer.CreatedAt
        };
    }
}
