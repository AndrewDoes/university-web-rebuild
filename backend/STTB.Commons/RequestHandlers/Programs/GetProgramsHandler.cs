using MediatR;
using Microsoft.EntityFrameworkCore;
using STTB.Contracts.RequestModels.Programs;
using STTB.Contracts.ResponseModels.Programs;
using STTB.Entities;

namespace STTB.Commons.RequestHandlers.Programs
{
    public class GetProgramsHandler : IRequestHandler<GetProgramsRequest, List<GetProgramsResponse>>
    {
        private readonly ApplicationDbContext _context;

        public GetProgramsHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetProgramsResponse>> Handle(GetProgramsRequest request, CancellationToken cancellationToken)
        {
            var programs = await _context.Programs
                .Include(p => p.Features)
                .Include(p => p.Careers)
                .ToListAsync();

            return programs.Select(p => new GetProgramsResponse
            {
                Key = GenerateKey(p.Degree),
                Title = p.Title,
                Degree = p.Degree,
                Duration = p.Duration,
                Description = p.Description,
                Features = p.Features.Select(f => f.Feature).ToList(),
                Career = p.Careers.Select(c => c.Career).ToList()
            }).ToList();
        }

        private string GenerateKey(string degree)
        {
            return degree switch
            {
                "S.Th." => "s1",
                "M.Th." => "s2",
                "A.Md." => "d3",
                _ => ""
            };
        }
    }
}