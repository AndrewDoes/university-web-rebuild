using MediatR;
using STTB.Commons.Helpers;
using STTB.Contracts.RequestModels.Testimonials;
using STTB.Contracts.ResponseModels.Testimonials;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Testimonials;

public class UpdateTestimonialHandler : IRequestHandler<UpdateTestimonialRequest, UpdateTestimonialResponse>
{
    private readonly ApplicationDbContext _db;

    public UpdateTestimonialHandler(ApplicationDbContext db) => _db = db;

    public async Task<UpdateTestimonialResponse> Handle(UpdateTestimonialRequest request, CancellationToken cancellationToken)
    {
        var testimonial = await _db.Testimonials.FindAsync([request.Id], cancellationToken)
            ?? throw new KeyNotFoundException($"Testimonial with id {request.Id} not found.");

        testimonial.Name = request.Name;
        testimonial.Degree = request.Degree ?? string.Empty;
        testimonial.Photo = request.Photo ?? string.Empty;
        testimonial.Quote = request.Quote ?? string.Empty;
        testimonial.Position = request.Position ?? string.Empty;
        testimonial.IsFeatured = request.IsFeatured;

        await _db.SaveChangesAsync(cancellationToken);

        await NotificationHelper.AddNotificationAsync(
            _db,
            $"Testimoni '{testimonial.Name}' berhasil diperbarui",
            "update",
            "testimonial",
            cancellationToken);

        return new UpdateTestimonialResponse
        {
            Id = testimonial.Id,
            Name = testimonial.Name,
            Position = testimonial.Position,
            IsFeatured = testimonial.IsFeatured,
            CreatedAt = testimonial.CreatedAt
        };
    }
}
