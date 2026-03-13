using System.ComponentModel.DataAnnotations;

namespace STTB.Entities.Entities;

public class NewsCategory
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [StringLength(100)]
    public string Slug { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}
