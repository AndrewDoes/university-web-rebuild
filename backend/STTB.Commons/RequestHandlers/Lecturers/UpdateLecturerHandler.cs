using MediatR;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.Lecturers;
using STTB.Contracts.ResponseModels.Lecturers;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Lecturers;

public class UpdateLecturerHandler : IRequestHandler<UpdateLecturerRequest, UpdateLecturerResponse>
{
    private readonly ApplicationDbContext _db;

    public UpdateLecturerHandler(ApplicationDbContext db) => _db = db;

    public async Task<UpdateLecturerResponse> Handle(UpdateLecturerRequest request, CancellationToken cancellationToken)
    {
        var lecturer = await _db.Lecturers.FindAsync([request.Id], cancellationToken)
            ?? throw new KeyNotFoundException($"Lecturer with id {request.Id} not found.");

        lecturer.Name = request.Name;
        lecturer.Position = request.Position;
        lecturer.Description = request.Description;
        lecturer.Photo = request.Photo;

        await _db.SaveChangesAsync(cancellationToken);

        await NotificationHelper.AddNotificationAsync(
            _db,
            $"Dosen '{lecturer.Name}' berhasil diperbarui",
            "update",
            "lecturers",
            cancellationToken);

        return new UpdateLecturerResponse
        {
            Id = lecturer.Id,
            Name = lecturer.Name,
            Position = lecturer.Position,
            CreatedAt = lecturer.CreatedAt
        };
    }
}
