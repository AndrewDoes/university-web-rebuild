using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities;

[Table("events")]
public class Event
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Slug { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public string Image { get; set; }

    [Column("start_date")]
    public DateTime? StartDate { get; set; }

    [Column("end_date")]
    public DateTime? EndDate { get; set; }

    public string Time { get; set; }

    public string Location { get; set; }

    public string Speakers { get; set; }

    public string Agenda { get; set; }

    public string Price { get; set; }

    [Column("is_featured")]
    public bool IsFeatured { get; set; }

    public string Status { get; set; }

    [Column("max_participants")]
    public int? MaxParticipants { get; set; }

    [Column("registration_deadline")]
    public DateTime? RegistrationDeadline { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}