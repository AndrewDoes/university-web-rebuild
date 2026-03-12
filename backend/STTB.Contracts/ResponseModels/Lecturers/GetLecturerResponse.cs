namespace STTB.Contracts.ResponseModels.Lecturers;

public class GetLecturerResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Photo { get; set; }
    public DateTime CreatedAt { get; set; }
}
