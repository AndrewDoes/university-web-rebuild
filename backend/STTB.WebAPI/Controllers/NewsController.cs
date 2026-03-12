using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.News;
using STTB.Contracts.ResponseModels.News;
using System.ComponentModel.DataAnnotations;

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
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpGet("latest")]
    public async Task<ActionResult<GetLatestNewsResponse>> GetLatestNews([FromQuery] GetLatestNewsRequest request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateNews([FromBody] CreateNewsRequest request)
    {
        var newsId = await _mediator.Send(request);

        return Ok(new
        {
            message = "News successfully created",
            newsId = newsId
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNews(Guid id, [FromBody] UpdateNewsRequest request)
    {
        request.Id = id;

        var result = await _mediator.Send(request);

        if (!result)
        {
            return NotFound("News not found!");
        }

        return Ok("News updated successfully!");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNews(Guid id)
    {
        var result = await _mediator.Send(new DeleteNewsRequest
        {
            Id = id
        });

        if (!result)
        {
            return NotFound("News not found!");
        }

        return Ok("News deleted successfully!");
    }
}