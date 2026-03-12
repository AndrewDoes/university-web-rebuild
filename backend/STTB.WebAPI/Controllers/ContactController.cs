using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.Contact;

namespace STTB.WebAPI.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContactController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitContact(CreateContactRequest request)
        {
            var result = await _mediator.Send(request);

            return Ok(new
            {
                success = result,
                message = "Message sent successfully!"
            });
        }
    }
}