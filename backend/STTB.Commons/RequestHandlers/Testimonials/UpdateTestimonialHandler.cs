using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Testimonials;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers;

public class UpdateTestimonialHandler : IRequestHandler<UpdateTestimonialRequest, bool>
{
    private readonly ApplicationDbContext _context;

    public UpdateTestimonialHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(UpdateTestimonialRequest request, CancellationToken cancellationToken)
    {
        var testimonial = await _context.Testimonials
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (testimonial == null)
            return false;

        testimonial.Name = request.Name;
        testimonial.Degree = request.Degree;
        testimonial.Photo = request.Photo;
        testimonial.Quote = request.Quote;
        testimonial.Position = request.Position;
        testimonial.IsFeatured = request.IsFeatured;

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}