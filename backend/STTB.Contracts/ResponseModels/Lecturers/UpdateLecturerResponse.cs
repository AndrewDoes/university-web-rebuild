namespace STTB.Contracts.ResponseModels.Lecturers;

public class UpdateLecturerResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
