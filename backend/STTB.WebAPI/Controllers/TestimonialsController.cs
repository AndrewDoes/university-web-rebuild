using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.Testimonials;

namespace STTB.WebAPI.Controllers
{
    [ApiController]
    [Route("api/testimonials")]
    public class TestimonialsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TestimonialsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetTestimonials()
        {
            var result = await _mediator.Send(new GetTestimonialsRequest());
            return Ok(result);
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeaturedTestimonials([FromQuery] int limit = 4)
        {
            var result = await _mediator.Send(new GetFeaturedTestimonialsRequest
            {
                Limit = limit
            });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTestimonial([FromBody] CreateTestimonialRequest request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return Created(string.Empty, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTestimonial(Guid id, [FromBody] UpdateTestimonialRequest request, CancellationToken cancellationToken)
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
        public async Task<IActionResult> DeleteTestimonial(Guid id, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new DeleteTestimonialRequest { Id = id }, cancellationToken);

            if (!result.Success)
                return NotFound(result);

            return Ok(result);
        }
    }
}