using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.Events;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Route("api/events")]
public class EventsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EventsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetEvents()
    {
        var result = await _mediator.Send(new GetEventsQuery());
        return Ok(result);
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedEvents()
    {
        var result = await _mediator.Send(new GetFeaturedEventsRequest());
        return Ok(result);
    }

    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcomingEvents([FromQuery] [Range(1, 50, ErrorMessage = "Limit must be between 1 and 50")] int limit = 4)
    {
        var result = await _mediator.Send(new GetUpcomingEventsRequest
        {
            Limit = limit
        });

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(Guid id)
    {
        var result = await _mediator.Send(new GetEventDetailRequest(id));
        return Ok(result);
    }

    [HttpPost("{id}/register")]
    public async Task<IActionResult> RegisterEvent(Guid id, [FromBody] RegisterEventRequest request)
    {
        request.EventId = id;

        var result = await _mediator.Send(request);

        if (!result)
        {
            return NotFound("Event not found!");
        }

        return Ok("Registration successful!");
    }
}