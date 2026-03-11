using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities;

[Table("event_registrations")]
public class EventRegistration
{
    public Guid Id { get; set; }

    [Column("event_id")]
    public Guid EventId { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string Phone { get; set; }

    public string Church { get; set; }

    public string Notes { get; set; }

    [Column("registered_at")]
    public DateTime RegisteredAt { get; set; }

    [Column("payment_status")]
    public string PaymentStatus { get; set; }
}