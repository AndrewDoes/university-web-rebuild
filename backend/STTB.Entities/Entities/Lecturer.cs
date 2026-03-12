using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities;

public class Lecturer
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [StringLength(150)]
    public string Position { get; set; } = string.Empty;

    public string? Description { get; set; }

    [StringLength(255)]
    public string? Photo { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
