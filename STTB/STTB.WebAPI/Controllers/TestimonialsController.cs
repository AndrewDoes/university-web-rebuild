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
    }
}