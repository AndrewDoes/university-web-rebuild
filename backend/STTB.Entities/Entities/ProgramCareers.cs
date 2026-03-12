using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities
{
    [Table("program_careers")]
    public class ProgramCareers
    {
        public Guid Id { get; set; }

        [Column("program_id")]
        public Guid ProgramId { get; set; }

        public string Career { get; set; }

        public Program Program { get; set; }
    }
}