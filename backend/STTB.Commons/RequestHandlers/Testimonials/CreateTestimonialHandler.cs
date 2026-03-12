using MediatR;
using STTB.Contracts.RequestModels.Testimonials;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers;

public class CreateTestimonialHandler : IRequestHandler<CreateTestimonialRequest, Guid>
{
    private readonly ApplicationDbContext _context;

    public CreateTestimonialHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateTestimonialRequest request, CancellationToken cancellationToken)
    {
        var testimonial = new Testimonial
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Degree = request.Degree,
            Photo = request.Photo,
            Quote = request.Quote,
            Position = request.Position,
            IsFeatured = request.IsFeatured,
            CreatedAt = DateTime.Now
        };

        _context.Testimonials.Add(testimonial);

        await _context.SaveChangesAsync(cancellationToken);

        return testimonial.Id;
    }
}