namespace STTB.Contracts.ResponseModels.Notifications
{
    public class GetNotificationsResponse
    {
        public Guid Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? Type { get; set; }
        public string? Module { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}