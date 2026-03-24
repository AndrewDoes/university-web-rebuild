using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.Events;
using STTB.Contracts.ResponseModels.Events;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Events;

public class CreateEventHandler : IRequestHandler<CreateEventRequest, CreateEventResponse>
{
    private readonly ApplicationDbContext _db;

    public CreateEventHandler(ApplicationDbContext db) => _db = db;

    public async Task<CreateEventResponse> Handle(CreateEventRequest request, CancellationToken cancellationToken)
    {
        var baseSlug = string.IsNullOrWhiteSpace(request.Slug)
            ? GenerateSlug(request.Title)
            : GenerateSlug(request.Slug);

        var slug = await GenerateUniqueSlugAsync(baseSlug, cancellationToken);

        var ev = new STTB.Entities.Event
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Slug = slug,
            Description = request.Description ?? string.Empty,
            Content = request.Content ?? string.Empty,
            Image = request.Image ?? string.Empty,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Time = request.Time ?? string.Empty,
            Location = request.Location ?? string.Empty,
            Speakers = request.Speakers ?? string.Empty,
            Agenda = request.Agenda ?? string.Empty,
            Price = request.Price ?? string.Empty,
            IsFeatured = request.IsFeatured,
            Status = request.Status,
            MaxParticipants = request.MaxParticipants,
            RegistrationDeadline = request.RegistrationDeadline,
            CreatedAt = DateTime.UtcNow
        };

        _db.Events.Add(ev);
        await _db.SaveChangesAsync(cancellationToken);

        await NotificationHelper.AddNotificationAsync(
            _db,
            $"Event '{ev.Title}' berhasil ditambahkan",
            "create",
            "events",
            cancellationToken);

        return new CreateEventResponse
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

    private async Task<string> GenerateUniqueSlugAsync(string baseSlug, CancellationToken cancellationToken)
    {
        var slug = baseSlug;
        var counter = 1;

        while (await _db.Events.AnyAsync(x => x.Slug == slug, cancellationToken))
        {
            slug = $"{baseSlug}-{counter}";
            counter++;
        }

        return slug;
    }
}