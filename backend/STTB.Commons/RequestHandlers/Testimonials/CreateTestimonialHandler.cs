using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.Testimonials;
using STTB.Contracts.ResponseModels.Testimonials;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers.Testimonials;

public class CreateTestimonialHandler : IRequestHandler<CreateTestimonialRequest, CreateTestimonialResponse>
{
    private readonly ApplicationDbContext _db;

    public CreateTestimonialHandler(ApplicationDbContext db) => _db = db;

    public async Task<CreateTestimonialResponse> Handle(CreateTestimonialRequest request, CancellationToken cancellationToken)
    {
        var testimonial = new Testimonial
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Degree = request.Degree ?? string.Empty,
            Photo = request.Photo ?? string.Empty,
            Quote = request.Quote ?? string.Empty,
            Position = request.Position ?? string.Empty,
            IsFeatured = request.IsFeatured,
            CreatedAt = DateTime.UtcNow
        };

        _db.Testimonials.Add(testimonial);
        await _db.SaveChangesAsync(cancellationToken);

        await NotificationHelper.AddNotificationAsync(
            _db,
            $"Testimoni '{testimonial.Name}' berhasil ditambahkan",
            "create",
            "testimonial",
            cancellationToken);

        return new CreateTestimonialResponse
        {
            Id = testimonial.Id,
            Name = testimonial.Name,
            Position = testimonial.Position,
            IsFeatured = testimonial.IsFeatured,
            CreatedAt = testimonial.CreatedAt
        };
    }
}
