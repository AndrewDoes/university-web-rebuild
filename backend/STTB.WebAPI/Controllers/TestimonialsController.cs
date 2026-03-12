using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.Testimonials;
using System.ComponentModel.DataAnnotations;

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
        public async Task<IActionResult> GetFeaturedTestimonials([FromQuery][Range(1, 50, ErrorMessage = "Limit must be between 1 and 50")] int limit = 4)
        {
            var result = await _mediator.Send(new GetFeaturedTestimonialsRequest
            {
                Limit = limit
            });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTestimonial([FromBody] CreateTestimonialRequest request)
        {
            var testimonialId = await _mediator.Send(request);

            return Ok(new
            {
                message = "Testimonial successfully created",
                testimonialId
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTestimonial(Guid id, [FromBody] UpdateTestimonialRequest request)
        {
            request.Id = id;

            var result = await _mediator.Send(request);

            if (!result)
            {
                return NotFound("Testimonial not found!");
            }

            return Ok("Testimonial updated successfully!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestimonial(Guid id)
        {
            var result = await _mediator.Send(new DeleteTestimonialRequest
            {
                Id = id
            });

            if (!result)
            {
                return NotFound("Testimonial not found!");
            }

            return Ok("Testimonial deleted successfully!");
        }
    }
}