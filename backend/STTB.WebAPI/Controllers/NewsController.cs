using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;

namespace STTB.WebAPI.Controllers;

[ApiController]
[Route("api/news")]
public class NewsController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<GetNewsListResponse>> GetNews(
        [FromQuery] GetNewsListRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetNewsDetailResponse>> GetNewsById(
    Guid id,
    CancellationToken cancellationToken)
    {
        var request = new GetNewsDetailRequest
        {
            Id = id
        };

        var result = await _mediator.Send(request, cancellationToken);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpGet("latest")]
    public async Task<ActionResult<GetLatestNewsResponse>> GetLatestNews(
    [FromQuery] GetLatestNewsRequest request,
    CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<CreateNewsResponse>> CreateNews(
        [FromBody] CreateNewsRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return CreatedAtAction(nameof(GetNewsById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UpdateNewsResponse>> UpdateNews(
        Guid id,
        [FromBody] UpdateNewsRequest request,
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
    public async Task<ActionResult<DeleteNewsResponse>> DeleteNews(
        Guid id,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new DeleteNewsRequest { Id = id }, cancellationToken);

        if (!result.Success)
            return NotFound(result);

        return Ok(result);
    }
}