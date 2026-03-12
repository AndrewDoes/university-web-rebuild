using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Testimonials;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers;

public class DeleteTestimonialHandler : IRequestHandler<DeleteTestimonialRequest, bool>
{
    private readonly ApplicationDbContext _context;

    public DeleteTestimonialHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(DeleteTestimonialRequest request, CancellationToken cancellationToken)
    {
        var testimonial = await _context.Testimonials
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (testimonial == null)
            return false;

        _context.Testimonials.Remove(testimonial);

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}