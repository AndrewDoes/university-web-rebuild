using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities;

public class News
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = string.Empty;

    [StringLength(100)]
    public string Slug { get; set; } = string.Empty;

    public string? Excerpt { get; set; }

    public string? Content { get; set; }

    [StringLength(255)]
    public string? Image { get; set; }

    public Guid CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public virtual NewsCategory? Category { get; set; }

    [StringLength(100)]
    public string Author { get; set; } = string.Empty;

    [Column("published_at")]
    public DateTime PublishedAt { get; set; }

    [StringLength(20)]
    public string Status { get; set; } = "draft";

    public int Views { get; set; }

    public string? Tags { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}