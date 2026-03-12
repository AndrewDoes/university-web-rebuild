namespace STTB.Contracts.ResponseModels.Programs
{
    public class GetProgramsResponse
    {
        public string Key { get; set; }

        public string Title { get; set; }

        public string Degree { get; set; }

        public string Duration { get; set; }

        public string Description { get; set; }

        public List<string> Features { get; set; }

        public List<string> Career { get; set; }
    }
}