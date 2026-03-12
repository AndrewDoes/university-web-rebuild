using MediatR;

namespace STTB.Contracts.RequestModels.Contact
{
    public class CreateContactRequest : IRequest<bool>
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }
    }
}