using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities
{
    public class Program
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Degree { get; set; }

        public string Duration { get; set; }

        public string Description { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        public ICollection<ProgramFeatures> Features { get; set; }

        public ICollection<ProgramCareers> Careers { get; set; }
    }
}