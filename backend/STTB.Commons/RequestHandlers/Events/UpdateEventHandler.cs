using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Events;
using STTB.Contracts.ResponseModels.Events;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class UpdateEventHandler : IRequestHandler<UpdateEventRequest, UpdateEventResponse>
{
    private readonly ApplicationDbContext _db;

    public UpdateEventHandler(ApplicationDbContext db) => _db = db;

    public async Task<UpdateEventResponse> Handle(UpdateEventRequest request, CancellationToken cancellationToken)
    {
        var ev = await _db.Events.FindAsync([request.Id], cancellationToken)
            ?? throw new KeyNotFoundException($"Event with id {request.Id} not found.");

        var baseSlug = string.IsNullOrWhiteSpace(request.Slug)
            ? GenerateSlug(request.Title)
            : GenerateSlug(request.Slug);

        var slug = await GenerateUniqueSlugAsync(baseSlug, request.Id, cancellationToken);

        ev.Title = request.Title;
        ev.Slug = slug;
        ev.Description = request.Description ?? string.Empty;
        ev.Content = request.Content ?? string.Empty;
        ev.Image = request.Image ?? string.Empty;
        ev.StartDate = request.StartDate;
        ev.EndDate = request.EndDate;
        ev.Time = request.Time ?? string.Empty;
        ev.Location = request.Location ?? string.Empty;
        ev.Speakers = request.Speakers ?? string.Empty;
        ev.Agenda = request.Agenda ?? string.Empty;
        ev.Price = request.Price ?? string.Empty;
        ev.IsFeatured = request.IsFeatured;
        ev.Status = request.Status;
        ev.MaxParticipants = request.MaxParticipants;
        ev.RegistrationDeadline = request.RegistrationDeadline;

        await _db.SaveChangesAsync(cancellationToken);

        return new UpdateEventResponse
        {
            Id = ev.Id,
            Title = ev.Title,
            Slug = ev.Slug,
            Status = ev.Status,
            CreatedAt = ev.CreatedAt
        };
    }

    private static string GenerateSlug(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return Guid.NewGuid().ToString();

        return text.Trim()
            .ToLower()
            .Replace(" ", "-");
    }

    private async Task<string> GenerateUniqueSlugAsync(string baseSlug, Guid currentId, CancellationToken cancellationToken)
    {
        var slug = baseSlug;
        var counter = 1;

        while (await _db.Events.AnyAsync(x => x.Slug == slug && x.Id != currentId, cancellationToken))
        {
            slug = $"{baseSlug}-{counter}";
            counter++;
        }

        return slug;
    }
}