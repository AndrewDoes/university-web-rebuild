namespace STTB.Contracts.ResponseModels.Lecturers;

public class CreateLecturerResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
