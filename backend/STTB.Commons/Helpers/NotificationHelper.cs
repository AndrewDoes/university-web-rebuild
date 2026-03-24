using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.Helpers
{
    public static class NotificationHelper
    {
        public static async Task AddNotificationAsync(
            ApplicationDbContext db,
            string message,
            string type,
            string module,
            CancellationToken cancellationToken = default)
        {
            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                Message = message,
                Type = type,
                Module = module,
                CreatedAt = DateTime.Now
            };

            db.Notifications.Add(notification);
            await db.SaveChangesAsync(cancellationToken);
        }
    }
}