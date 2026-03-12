using System.ComponentModel.DataAnnotations.Schema;

namespace STTB.Entities.Entities
{
    [Table("program_features")]
    public class ProgramFeatures
    {
        public Guid Id { get; set; }

        [Column("program_id")]
        public Guid ProgramId { get; set; }

        public string Feature { get; set; }

        public Program Program { get; set; }
    }
}