using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities
{
    [Table("notifications")]
    public class Notification
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Required]
        [StringLength(255)]
        [Column("message")]
        public string Message { get; set; } = string.Empty;

        [StringLength(20)]
        [Column("type")]
        public string? Type { get; set; }

        [StringLength(50)]
        [Column("module")]
        public string? Module { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}