using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities
{
    public class Testimonial
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Degree { get; set; }

        public string Photo { get; set; }

        public string Quote { get; set; }

        public string Position { get; set; }

        [Column("is_featured")]
        public bool IsFeatured { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}