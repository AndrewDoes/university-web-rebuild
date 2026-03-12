using MediatR;
using STTB.Contracts.RequestModels.Lecturers;
using STTB.Contracts.ResponseModels.Lecturers;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers.Lecturers;

public class CreateLecturerHandler : IRequestHandler<CreateLecturerRequest, CreateLecturerResponse>
{
    private readonly ApplicationDbContext _db;

    public CreateLecturerHandler(ApplicationDbContext db) => _db = db;

    public async Task<CreateLecturerResponse> Handle(CreateLecturerRequest request, CancellationToken cancellationToken)
    {
        var lecturer = new Lecturer
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Position = request.Position,
            Description = request.Description,
            Photo = request.Photo,
            CreatedAt = DateTime.UtcNow
        };

        _db.Lecturers.Add(lecturer);
        await _db.SaveChangesAsync(cancellationToken);

        return new CreateLecturerResponse
        {
            Id = lecturer.Id,
            Name = lecturer.Name,
            Position = lecturer.Position,
            CreatedAt = lecturer.CreatedAt
        };
    }
}
