using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities
{
    [Table("contact_messages")]
    public class ContactMessage
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }

        [Column("submitted_at")]
        public DateTime SubmittedAt { get; set; }

        public string Status { get; set; }
    }
}