using Microsoft.EntityFrameworkCore;
using STTB.Entities.Entities;

namespace STTB.Entities;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Event> Events { get; set; }

    public DbSet<News> News { get; set; }

    public DbSet<NewsCategory> NewsCategories { get; set; }

    public DbSet<EventRegistration> EventRegistrations { get; set; }

    public DbSet<Testimonial> Testimonials { get; set; }

    public DbSet<Program> Programs { get; set; }

    public DbSet<ProgramFeatures> ProgramFeatures { get; set; }

    public DbSet<ProgramCareers> ProgramCareers { get; set; }

    public DbSet<ContactMessage> ContactMessages { get; set; }

    public DbSet<Lecturer> Lecturers { get; set; }

    public DbSet<UserAccount> UserAccounts { get; set; }

    public DbSet<Notification> Notifications { get; set; }
}
