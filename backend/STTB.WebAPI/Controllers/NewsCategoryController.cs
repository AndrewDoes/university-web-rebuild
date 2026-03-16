using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.NewsCategories;
using STTB.Contracts.ResponseModels.NewsCategories;

namespace STTB.WebAPI.Controllers;

[ApiController]
[Route("api/newscategories")]
public class NewsCategoryController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewsCategoryController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<GetNewsCategoriesResponse>> GetNewsCategories(
        CancellationToken cancellationToken)
    {
        var request = new GetNewsCategoriesRequest();
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<CreateNewsCategoryResponse>> CreateNewsCategory(
        [FromBody] CreateNewsCategoryRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UpdateNewsCategoryResponse>> UpdateNewsCategory(
        Guid id,
        [FromBody] UpdateNewsCategoryRequest request,
        CancellationToken cancellationToken)
    {
        request.Id = id;
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteNewsCategory(
        Guid id,
        CancellationToken cancellationToken)
    {
        var request = new DeleteNewsCategoryRequest { Id = id };
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }
}
