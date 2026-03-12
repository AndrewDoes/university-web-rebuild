using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.Programs;

namespace STTB.WebAPI.Controllers
{
    [ApiController]
    [Route("api/programs")]
    public class ProgramsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProgramsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetPrograms()
        {
            var result = await _mediator.Send(new GetProgramsRequest());
            return Ok(result);
        }
    }
}