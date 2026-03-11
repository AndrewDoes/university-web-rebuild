using Microsoft.EntityFrameworkCore;
using STTB.Entities.Entities;

namespace STTB.Entities;

public class ApplicationDbContext : DbContext
{
    public DbSet<Event> Events { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    //public DbSet<News> News => Set<News>();
    public DbSet<News> News { get; set; }
    public DbSet<EventRegistration> EventRegistrations { get; set; }
}