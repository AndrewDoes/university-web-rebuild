using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities;

public class Testimonial
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(100)]
    public string? Name { get; set; }

    [StringLength(50)]
    public string? Degree { get; set; }

    [StringLength(255)]
    public string? Photo { get; set; }

    public string? Quote { get; set; }

    [StringLength(150)]
    public string? Position { get; set; }

    [Column("is_featured")]
    public bool IsFeatured { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}