namespace STTB.Contracts.ResponseModels.Testimonials
{
    public class GetTestimonialsResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Degree { get; set; }

        public string Photo { get; set; }

        public string Quote { get; set; }

        public string Position { get; set; }
    }
}