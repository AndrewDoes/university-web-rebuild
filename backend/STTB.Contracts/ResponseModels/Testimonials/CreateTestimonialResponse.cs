namespace STTB.Contracts.ResponseModels.Testimonials;

public class CreateTestimonialResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public DateTime CreatedAt { get; set; }
}
