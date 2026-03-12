using MediatR;
using STTB.Contracts.RequestModels.Testimonials;
using STTB.Contracts.ResponseModels.Testimonials;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Testimonials;

public class DeleteTestimonialHandler : IRequestHandler<DeleteTestimonialRequest, DeleteTestimonialResponse>
{
    private readonly ApplicationDbContext _db;

    public DeleteTestimonialHandler(ApplicationDbContext db) => _db = db;

    public async Task<DeleteTestimonialResponse> Handle(DeleteTestimonialRequest request, CancellationToken cancellationToken)
    {
        var testimonial = await _db.Testimonials.FindAsync([request.Id], cancellationToken);

        if (testimonial is null)
            return new DeleteTestimonialResponse { Success = false, Message = "Testimonial not found." };

        _db.Testimonials.Remove(testimonial);
        await _db.SaveChangesAsync(cancellationToken);

        return new DeleteTestimonialResponse { Success = true, Message = "Testimonial deleted successfully." };
    }
}
