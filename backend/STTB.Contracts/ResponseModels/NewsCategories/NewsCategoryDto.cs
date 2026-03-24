using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Contracts.ResponseModels.NewsCategories;

public class NewsCategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
