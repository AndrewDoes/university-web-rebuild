using MediatR;
using STTB.Contracts.RequestModels.Lecturers;
using STTB.Contracts.ResponseModels.Lecturers;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Lecturers;

public class DeleteLecturerHandler : IRequestHandler<DeleteLecturerRequest, DeleteLecturerResponse>
{
    private readonly ApplicationDbContext _db;

    public DeleteLecturerHandler(ApplicationDbContext db) => _db = db;

    public async Task<DeleteLecturerResponse> Handle(DeleteLecturerRequest request, CancellationToken cancellationToken)
    {
        var lecturer = await _db.Lecturers.FindAsync([request.Id], cancellationToken);

        if (lecturer is null)
            return new DeleteLecturerResponse { Success = false, Message = "Lecturer not found." };

        _db.Lecturers.Remove(lecturer);
        await _db.SaveChangesAsync(cancellationToken);

        return new DeleteLecturerResponse { Success = true, Message = "Lecturer deleted successfully." };
    }
}
