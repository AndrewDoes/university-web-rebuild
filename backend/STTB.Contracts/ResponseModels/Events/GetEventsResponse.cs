namespace STTB.Contracts.ResponseModels.Events;

public class GetEventsResponse
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Image { get; set; }

    public DateTime? StartDate { get; set; }

    public string Time { get; set; }

    public string Location { get; set; }

    public string Price { get; set; }

    public string Message { get; set; } = null;
}