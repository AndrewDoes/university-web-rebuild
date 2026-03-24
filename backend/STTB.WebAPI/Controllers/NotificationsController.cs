using MediatR;
using Microsoft.AspNetCore.Mvc;
using STTB.Contracts.RequestModels.Notifications;
using System.ComponentModel.DataAnnotations;

namespace STTB.WebAPI.Controllers
{
    [ApiController]
    [Route("api/notifications")]
    public class NotificationsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public NotificationsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications(
            [FromQuery]
            [Range(1, 50, ErrorMessage = "Limit must be between 1 and 50")]
            int limit = 10)
        {
            var result = await _mediator.Send(new GetNotificationsRequest
            {
                Limit = limit
            });

            return Ok(result);
        }
    }
}