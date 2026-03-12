using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.Lecturers;
using STTB.Contracts.ResponseModels.Lecturers;

namespace STTB.WebAPI.Controllers;

[ApiController]
[Route("api/lecturers")]
public class LecturersController : ControllerBase
{
    private readonly IMediator _mediator;

    public LecturersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<GetLecturerResponse>>> GetLecturers(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetLecturersRequest(), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetLecturerResponse>> GetLecturer(Guid id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetLecturerDetailRequest { Id = id }, cancellationToken);

        if (result is null)
            return NotFound();

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<CreateLecturerResponse>> CreateLecturer(
        [FromBody] CreateLecturerRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return CreatedAtAction(nameof(GetLecturer), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UpdateLecturerResponse>> UpdateLecturer(
        Guid id,
        [FromBody] UpdateLecturerRequest request,
        CancellationToken cancellationToken)
    {
        request.Id = id;

        try
        {
            var result = await _mediator.Send(request, cancellationToken);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<DeleteLecturerResponse>> DeleteLecturer(Guid id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new DeleteLecturerRequest { Id = id }, cancellationToken);

        if (!result.Success)
            return NotFound(result);

        return Ok(result);
    }
}
